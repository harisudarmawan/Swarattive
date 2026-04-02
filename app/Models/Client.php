<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Client extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'phone',
        'address',
        'birth_date',
        'gender',
    ];

    protected $casts = [
        'birth_date' => 'date',
    ];

    public function bookings(): HasMany
    {
        return $this->hasMany(Booking::class);
    }

    public function getFullNameAttribute()
    {
        return $this->name;
    }

    public function scopeByEmail($query, $email)
    {
        return $query->where('email', $email);
    }
}
