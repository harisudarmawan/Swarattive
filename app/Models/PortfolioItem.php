<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class PortfolioItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'category_id',
        'title',
        'slug',
        'description',
        'image_url',
        'gallery_images',
        'tags',
        'is_featured',
        'is_active',
        'shoot_date',
        'client_name',
    ];

    protected $casts = [
        'gallery_images' => 'array',
        'tags' => 'array',
        'is_featured' => 'boolean',
        'is_active' => 'boolean',
        'shoot_date' => 'date',
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    public function scopeByCategory($query, $categoryId)
    {
        return $query->where('category_id', $categoryId);
    }

    public function getFormattedDateAttribute()
    {
        return $this->shoot_date->format('F d, Y');
    }
}
