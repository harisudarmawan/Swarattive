<?php
/**
 * SWARATTIVE API - Portfolio Endpoints
 * REST API untuk mengelola portfolio items
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type');

require_once '../database/config.php';

class PortfolioAPI {
    private $db;
    
    public function __construct() {
        $this->db = new Database();
    }
    
    public function handleRequest() {
        $method = $_SERVER['REQUEST_METHOD'];
        $path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
        $pathParts = explode('/', trim($path, '/'));
        
        switch ($method) {
            case 'GET':
                $this->getPortfolio();
                break;
            case 'POST':
                $this->createPortfolio();
                break;
            case 'PUT':
                $this->updatePortfolio();
                break;
            case 'DELETE':
                $this->deletePortfolio();
                break;
            default:
                $this->sendResponse(405, ['error' => 'Method not allowed']);
        }
    }
    
    private function getPortfolio() {
        $categoryId = $_GET['category'] ?? null;
        $featured = $_GET['featured'] ?? null;
        
        $sql = "SELECT pi.*, c.name as category_name 
                FROM portfolio_items pi 
                LEFT JOIN categories c ON pi.category_id = c.id 
                WHERE pi.is_active = 1";
        
        $params = [];
        
        if ($categoryId) {
            $sql .= " AND pi.category_id = ?";
            $params[] = $categoryId;
        }
        
        if ($featured !== null) {
            $sql .= " AND pi.is_featured = ?";
            $params[] = $featured === 'true' ? 1 : 0;
        }
        
        $sql .= " ORDER BY pi.sort_order, pi.created_at";
        
        try {
            $stmt = $this->db->getConnection()->prepare($sql);
            $stmt->execute($params);
            $items = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            $this->sendResponse(200, [
                'success' => true,
                'data' => $items
            ]);
        } catch (PDOException $e) {
            $this->sendResponse(500, ['error' => 'Database error: ' . $e->getMessage()]);
        }
    }
    
    private function createPortfolio() {
        $input = json_decode(file_get_contents('php://input'), true);
        
        if (!$input) {
            $this->sendResponse(400, ['error' => 'Invalid JSON']);
            return;
        }
        
        $required = ['title', 'image_url'];
        foreach ($required as $field) {
            if (empty($input[$field])) {
                $this->sendResponse(400, ['error' => "Field '$field' is required"]);
                return;
            }
        }
        
        $sql = "INSERT INTO portfolio_items (title, category_id, image_url, description, is_featured, sort_order) 
                VALUES (?, ?, ?, ?, ?, ?)";
        
        try {
            $stmt = $this->db->getConnection()->prepare($sql);
            $stmt->execute([
                $input['title'],
                $input['category_id'] ?? null,
                $input['image_url'],
                $input['description'] ?? null,
                $input['is_featured'] ?? false,
                $input['sort_order'] ?? 0
            ]);
            
            $id = $this->db->getConnection()->lastInsertId();
            
            $this->sendResponse(201, [
                'success' => true,
                'message' => 'Portfolio item created successfully',
                'id' => $id
            ]);
        } catch (PDOException $e) {
            $this->sendResponse(500, ['error' => 'Database error: ' . $e->getMessage()]);
        }
    }
    
    private function updatePortfolio() {
        $input = json_decode(file_get_contents('php://input'), true);
        
        if (!$input || empty($input['id'])) {
            $this->sendResponse(400, ['error' => 'ID is required']);
            return;
        }
        
        $fields = [];
        $params = [];
        
        $allowedFields = ['title', 'category_id', 'image_url', 'description', 'is_featured', 'sort_order', 'is_active'];
        
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
        
        $sql = "UPDATE portfolio_items SET " . implode(', ', $fields) . " WHERE id = ?";
        
        try {
            $stmt = $this->db->getConnection()->prepare($sql);
            $stmt->execute($params);
            
            $this->sendResponse(200, [
                'success' => true,
                'message' => 'Portfolio item updated successfully'
            ]);
        } catch (PDOException $e) {
            $this->sendResponse(500, ['error' => 'Database error: ' . $e->getMessage()]);
        }
    }
    
    private function deletePortfolio() {
        $id = $_GET['id'] ?? null;
        
        if (!$id) {
            $this->sendResponse(400, ['error' => 'ID is required']);
            return;
        }
        
        try {
            $stmt = $this->db->getConnection()->prepare("UPDATE portfolio_items SET is_active = 0 WHERE id = ?");
            $stmt->execute([$id]);
            
            $this->sendResponse(200, [
                'success' => true,
                'message' => 'Portfolio item deleted successfully'
            ]);
        } catch (PDOException $e) {
            $this->sendResponse(500, ['error' => 'Database error: ' . $e->getMessage()]);
        }
    }
    
    private function sendResponse($statusCode, $data) {
        http_response_code($statusCode);
        echo json_encode($data);
        exit;
    }
}

$api = new PortfolioAPI();
$api->handleRequest();
?>
