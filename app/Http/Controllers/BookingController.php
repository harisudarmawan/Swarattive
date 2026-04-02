<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Service;
use App\Models\ServicePackage;
use App\Models\TeamMember;
use App\Models\Client;
use App\Models\Booking;
use App\Models\PaymentMethod;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Carbon\Carbon;

class BookingController extends Controller
{
    public function index()
    {
        $categories = Category::active()->ordered()->get();
        $services = Service::with(['category', 'packages'])
            ->active()
            ->ordered()
            ->get();
        $teamMembers = TeamMember::active()->ordered()->get();
        $paymentMethods = PaymentMethod::active()->get();

        return view('booking.index', compact(
            'categories',
            'services',
            'teamMembers',
            'paymentMethods'
        ));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'service_id' => 'required|exists:services,id',
            'package_id' => 'nullable|exists:service_packages,id',
            'team_member_id' => 'nullable|exists:team_members,id',
            'booking_date' => 'required|date|after_or_equal:today',
            'booking_time' => 'required',
            'location_type' => 'required|in:studio,outdoor,venue,custom',
            'location_address' => 'required_if:location_type,venue,custom',
            'client_name' => 'required|string|max:255',
            'client_email' => 'required|email|max:255',
            'client_phone' => 'required|string|max:20',
            'notes' => 'nullable|string',
        ]);

        // Find or create client
        $client = Client::firstOrCreate(
            ['email' => $validated['client_email']],
            [
                'name' => $validated['client_name'],
                'phone' => $validated['client_phone'],
            ]
        );

        // Get service details
        $service = Service::findOrFail($validated['service_id']);
        $package = $validated['package_id'] ? ServicePackage::findOrFail($validated['package_id']) : null;
        $totalPrice = $package ? $package->price : $service->base_price;

        // Generate booking code
        $date = Carbon::now()->format('Ymd');
        $count = Booking::whereDate('created_at', today())->count() + 1;
        $bookingCode = 'SWR-' . $date . '-' . str_pad($count, 3, '0', STR_PAD_LEFT);

        // Create booking
        $booking = Booking::create([
            'booking_code' => $bookingCode,
            'client_id' => $client->id,
            'service_id' => $validated['service_id'],
            'package_id' => $validated['package_id'],
            'team_member_id' => $validated['team_member_id'],
            'booking_date' => $validated['booking_date'],
            'booking_time' => $validated['booking_time'],
            'location_type' => $validated['location_type'],
            'location_address' => $validated['location_address'],
            'total_price' => $totalPrice,
            'status' => 'pending',
            'notes' => $validated['notes'],
        ]);

        return redirect()->route('booking.check')
            ->with('success', 'Booking created successfully! Your booking code is: ' . $bookingCode);
    }

    public function check()
    {
        return view('booking.check');
    }

    public function checkStatus(Request $request)
    {
        $validated = $request->validate([
            'booking_code' => 'required|string|max:20',
        ]);

        $booking = Booking::with([
            'client',
            'service.category',
            'package',
            'teamMember',
            'payments.paymentMethod'
        ])
        ->where('booking_code', $validated['booking_code'])
        ->firstOrFail();

        return view('booking.status', compact('booking'));
    }
}
