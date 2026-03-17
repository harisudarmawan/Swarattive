<?php
/**
 * SWARATTIVE API - Booking Endpoints
 * REST API untuk mengelola booking system
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type');

require_once '../database/config.php';

class BookingAPI {
    private $db;
    
    public function __construct() {
        $this->db = new Database();
    }
    
    public function handleRequest() {
        $method = $_SERVER['REQUEST_METHOD'];
        
        switch ($method) {
            case 'GET':
                $this->getBookings();
                break;
            case 'POST':
                $this->createBooking();
                break;
            case 'PUT':
                $this->updateBooking();
                break;
            default:
                $this->sendResponse(405, ['error' => 'Method not allowed']);
        }
    }
    
    private function getBookings() {
        $bookingCode = $_GET['code'] ?? null;
        
        if ($bookingCode) {
            // Get specific booking by code
            $sql = "SELECT b.*, c.name as client_name, c.email as client_email, c.phone as client_phone,
                    s.name as service_name, sp.name as package_name, tm.name as photographer_name
                    FROM bookings b
                    JOIN clients c ON b.client_id = c.id
                    JOIN services s ON b.service_id = s.id
                    LEFT JOIN service_packages sp ON b.package_id = sp.id
                    LEFT JOIN team_members tm ON b.team_member_id = tm.id
                    WHERE b.booking_code = ?";
            
            try {
                $stmt = $this->db->getConnection()->prepare($sql);
                $stmt->execute([$bookingCode]);
                $booking = $stmt->fetch(PDO::FETCH_ASSOC);
                
                if (!$booking) {
                    $this->sendResponse(404, ['error' => 'Booking not found']);
                    return;
                }
                
                // Get payment info
                $paymentSql = "SELECT p.*, pm.name as payment_method_name 
                               FROM payments p
                               JOIN payment_methods pm ON p.payment_method_id = pm.id
                               WHERE p.booking_id = ?";
                
                $paymentStmt = $this->db->getConnection()->prepare($paymentSql);
                $paymentStmt->execute([$booking['id']]);
                $booking['payments'] = $paymentStmt->fetchAll(PDO::FETCH_ASSOC);
                
                $this->sendResponse(200, [
                    'success' => true,
                    'data' => $booking
                ]);
            } catch (PDOException $e) {
                $this->sendResponse(500, ['error' => 'Database error: ' . $e->getMessage()]);
            }
        } else {
            // Get all bookings (admin view)
            $sql = "SELECT b.*, c.name as client_name, c.email as client_email,
                    s.name as service_name, sp.name as package_name
                    FROM bookings b
                    JOIN clients c ON b.client_id = c.id
                    JOIN services s ON b.service_id = s.id
                    LEFT JOIN service_packages sp ON b.package_id = sp.id
                    ORDER BY b.created_at DESC";
            
            try {
                $stmt = $this->db->getConnection()->query($sql);
                $bookings = $stmt->fetchAll(PDO::FETCH_ASSOC);
                
                $this->sendResponse(200, [
                    'success' => true,
                    'data' => $bookings
                ]);
            } catch (PDOException $e) {
                $this->sendResponse(500, ['error' => 'Database error: ' . $e->getMessage()]);
            }
        }
    }
    
    private function createBooking() {
        $input = json_decode(file_get_contents('php://input'), true);
        
        if (!$input) {
            $this->sendResponse(400, ['error' => 'Invalid JSON']);
            return;
        }
        
        $required = ['client_name', 'client_email', 'client_phone', 'service_id', 'booking_date', 'booking_time', 'total_price'];
        foreach ($required as $field) {
            if (empty($input[$field])) {
                $this->sendResponse(400, ['error' => "Field '$field' is required"]);
                return;
            }
        }
        
        try {
            $this->db->getConnection()->beginTransaction();
            
            // Create or get client
            $clientSql = "INSERT INTO clients (name, email, phone, address) 
                          VALUES (?, ?, ?, ?)
                          ON DUPLICATE KEY UPDATE id = LAST_INSERT_ID(id)";
            
            $clientStmt = $this->db->getConnection()->prepare($clientSql);
            $clientStmt->execute([
                $input['client_name'],
                $input['client_email'],
                $input['client_phone'],
                $input['client_address'] ?? null
            ]);
            
            $clientId = $this->db->getConnection()->lastInsertId();
            
            // Create booking
            $bookingSql = "INSERT INTO bookings (client_id, service_id, package_id, team_member_id, 
                           booking_date, booking_time, location_type, location_address, total_price, notes) 
                           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            
            $bookingStmt = $this->db->getConnection()->prepare($bookingSql);
            $bookingStmt->execute([
                $clientId,
                $input['service_id'],
                $input['package_id'] ?? null,
                $input['team_member_id'] ?? null,
                $input['booking_date'],
                $input['booking_time'],
                $input['location_type'] ?? 'studio',
                $input['location_address'] ?? null,
                $input['total_price'],
                $input['notes'] ?? null
            ]);
            
            $bookingId = $this->db->getConnection()->lastInsertId();
            $bookingCode = $this->generateBookingCode();
            
            // Update booking with code
            $updateCodeSql = "UPDATE bookings SET booking_code = ? WHERE id = ?";
            $updateCodeStmt = $this->db->getConnection()->prepare($updateCodeSql);
            $updateCodeStmt->execute([$bookingCode, $bookingId]);
            
            // Create payment record if payment info provided
            if (!empty($input['payment_method_id'])) {
                $paymentSql = "INSERT INTO payments (booking_id, payment_method_id, amount, payment_type, status) 
                               VALUES (?, ?, ?, ?, ?)";
                
                $paymentStmt = $this->db->getConnection()->prepare($paymentSql);
                $paymentStmt->execute([
                    $bookingId,
                    $input['payment_method_id'],
                    $input['total_price'],
                    $input['payment_type'] ?? 'full_payment',
                    $input['payment_status'] ?? 'pending'
                ]);
            }
            
            $this->db->getConnection()->commit();
            
            $this->sendResponse(201, [
                'success' => true,
                'message' => 'Booking created successfully',
                'booking_code' => $bookingCode,
                'booking_id' => $bookingId
            ]);
            
        } catch (PDOException $e) {
            $this->db->getConnection()->rollBack();
            $this->sendResponse(500, ['error' => 'Database error: ' . $e->getMessage()]);
        }
    }
    
    private function updateBooking() {
        $input = json_decode(file_get_contents('php://input'), true);
        
        if (!$input || empty($input['id'])) {
            $this->sendResponse(400, ['error' => 'Booking ID is required']);
            return;
        }
        
        $fields = [];
        $params = [];
        
        $allowedFields = ['status', 'notes', 'team_member_id', 'location_type', 'location_address'];
        
        foreach ($allowedFields as $field) {
            if (array_key_exists($field, $input)) {
                $fields[] = "$field = ?";
                $params[] = $input[$field];
            }
        }
        
        if (empty($fields)) {
            $this->sendResponse(400, ['error' => 'No valid fields to update']);
            return;
        }
        
        $params[] = $input['id'];
        
        $sql = "UPDATE bookings SET " . implode(', ', $fields) . " WHERE id = ?";
        
        try {
            $stmt = $this->db->getConnection()->prepare($sql);
            $stmt->execute($params);
            
            $this->sendResponse(200, [
                'success' => true,
                'message' => 'Booking updated successfully'
            ]);
        } catch (PDOException $e) {
            $this->sendResponse(500, ['error' => 'Database error: ' . $e->getMessage()]);
        }
    }
    
    private function generateBookingCode() {
        $datePrefix = date('Ymd');
        
        $sql = "SELECT CONCAT('SWR-', ?, '-', LPAD(IFNULL(MAX(CAST(SUBSTRING(booking_code, 12) AS UNSIGNED)), 0) + 1, 3, '0')) as code
                FROM bookings 
                WHERE booking_code LIKE CONCAT('SWR-', ?, '-%')";
        
        $stmt = $this->db->getConnection()->prepare($sql);
        $stmt->execute([$datePrefix, $datePrefix]);
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        
        return $result['code'];
    }
    
    private function sendResponse($statusCode, $data) {
        http_response_code($statusCode);
        echo json_encode($data);
        exit;
    }
}

$api = new BookingAPI();
$api->handleRequest();
?>
