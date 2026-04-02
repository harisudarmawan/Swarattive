<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class PaymentMethod extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'type',
        'details',
        'is_active',
    ];

    protected $casts = [
        'details' => 'array',
        'is_active' => 'boolean',
    ];

    public function payments(): HasMany
    {
        return $this->hasMany(Payment::class);
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function getDisplayDetailsAttribute()
    {
        if ($this->type === 'bank') {
            return $this->details['account_number'] . ' - ' . $this->details['account_name'];
        } elseif ($this->type === 'ewallet') {
            return $this->details['phone_number'] . ' - ' . $this->details['account_name'];
        }
        
        return $this->name;
    }
}
