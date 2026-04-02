<?php

namespace App\Http\Controllers;

use App\Models\BlogPost;

class BlogController extends Controller
{
    public function index()
    {
        $blogPosts = BlogPost::where('is_published', true)
            ->orderBy('published_at', 'desc')
            ->paginate(9);

        return view('blog.index', compact('blogPosts'));
    }

    public function show($slug)
    {
        $blogPost = BlogPost::where('slug', $slug)
            ->where('is_published', true)
            ->firstOrFail();

        $relatedPosts = BlogPost::where('id', '!=', $blogPost->id)
            ->where('is_published', true)
            ->orderBy('published_at', 'desc')
            ->take(3)
            ->get();

        return view('blog.show', compact('blogPost', 'relatedPosts'));
    }
}
