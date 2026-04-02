<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\PortfolioItem;

class PortfolioController extends Controller
{
    public function index()
    {
        $categories = Category::active()->ordered()->get();
        $portfolioItems = PortfolioItem::with('category')
            ->active()
            ->orderBy('shoot_date', 'desc')
            ->paginate(12);

        return view('portfolio.index', compact('categories', 'portfolioItems'));
    }

    public function show($slug)
    {
        $portfolioItem = PortfolioItem::with('category')
            ->where('slug', $slug)
            ->where('is_active', true)
            ->firstOrFail();

        $relatedItems = PortfolioItem::with('category')
            ->where('category_id', $portfolioItem->category_id)
            ->where('id', '!=', $portfolioItem->id)
            ->where('is_active', true)
            ->take(6)
            ->get();

        return view('portfolio.show', compact('portfolioItem', 'relatedItems'));
    }
}
