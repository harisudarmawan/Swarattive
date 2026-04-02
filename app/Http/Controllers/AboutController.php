<?php

namespace App\Http\Controllers;

use App\Models\TeamMember;

class AboutController extends Controller
{
    public function index()
    {
        $teamMembers = TeamMember::active()->ordered()->get();
        
        return view('about.index', compact('teamMembers'));
    }
}
