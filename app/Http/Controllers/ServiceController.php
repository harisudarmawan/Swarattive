<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Service;
use App\Models\ServicePackage;
use App\Models\TeamMember;

class ServiceController extends Controller
{
    public function index()
    {
        $categories = Category::active()->ordered()->get();
        $services = Service::with(['category', 'packages'])
            ->active()
            ->ordered()
            ->get();
        $teamMembers = TeamMember::active()->ordered()->get();

        return view('services.index', compact('categories', 'services', 'teamMembers'));
    }
}
