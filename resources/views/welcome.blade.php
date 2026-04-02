@extends('layouts.app')

@section('title', 'Welcome to Swarattive Photography')
@section('description', 'Professional photography services for your special moments')

@section('content')
<!-- Hero Section -->
<section class="relative h-screen bg-cover bg-center" style="background-image: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80');">
    <div class="absolute inset-0 flex items-center justify-center">
        <div class="text-center text-white px-4">
            <h1 class="text-5xl md:text-7xl font-serif font-bold mb-6 animate-fade-in">
                Welcome to<br>
                <span class="text-amber-400">Swarattive</span><br>
                Photography
            </h1>
            <p class="text-xl md:text-2xl mb-8 max-w-2xl mx-auto animate-slide-up">
                Mengabadikan momen terindah dalam hidup Anda dengan sentuhan seni dan keindahan abadi.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
                <a href="{{ route('portfolio.index') }}" class="bg-amber-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors">
                    View Portfolio
                </a>
                <a href="{{ route('booking.index') }}" class="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-colors">
                    Book Now
                </a>
            </div>
        </div>
    </div>
</section>

<!-- Services Preview -->
<section class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
            <h2 class="text-4xl font-serif font-bold text-gray-900 mb-4">Our Services</h2>
            <p class="text-xl text-gray-600 max-w-2xl mx-auto">Professional photography services tailored to your needs</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div class="text-center group">
                <div class="bg-amber-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-600 transition-colors">
                    <svg class="w-10 h-10 text-amber-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
                    </svg>
                </div>
                <h3 class="text-xl font-semibold mb-2">Wedding Photography</h3>
                <p class="text-gray-600">Capture your special day with professional wedding photography</p>
            </div>
            
            <div class="text-center group">
                <div class="bg-amber-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-600 transition-colors">
                    <svg class="w-10 h-10 text-amber-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                    </svg>
                </div>
                <h3 class="text-xl font-semibold mb-2">Pre-Wedding</h3>
                <p class="text-gray-600">Beautiful pre-wedding sessions to celebrate your love story</p>
            </div>
            
            <div class="text-center group">
                <div class="bg-amber-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-600 transition-colors">
                    <svg class="w-10 h-10 text-amber-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                </div>
                <h3 class="text-xl font-semibold mb-2">Portrait</h3>
                <p class="text-gray-600">Professional portrait photography for individuals and families</p>
            </div>
            
            <div class="text-center group">
                <div class="bg-amber-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-600 transition-colors">
                    <svg class="w-10 h-10 text-amber-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                </div>
                <h3 class="text-xl font-semibold mb-2">Commercial</h3>
                <p class="text-gray-600">Professional commercial and product photography</p>
            </div>
        </div>
    </div>
</section>

<!-- Portfolio Preview -->
<section class="py-20 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
            <h2 class="text-4xl font-serif font-bold text-gray-900 mb-4">Recent Work</h2>
            <p class="text-xl text-gray-600 max-w-2xl mx-auto">Explore our latest photography projects</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div class="group relative overflow-hidden rounded-lg shadow-lg">
                <img src="https://images.unsplash.com/photo-1519221609281-713fe5d5e853?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Wedding Photography" class="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300">
                <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div class="absolute bottom-4 left-4 text-white">
                        <h3 class="text-xl font-semibold">Wedding Photography</h3>
                        <p class="text-sm">Sarah & John's Special Day</p>
                    </div>
                </div>
            </div>
            
            <div class="group relative overflow-hidden rounded-lg shadow-lg">
                <img src="https://images.unsplash.com/photo-1515934751635-c81c6bc9a3d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Portrait Session" class="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300">
                <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div class="absolute bottom-4 left-4 text-white">
                        <h3 class="text-xl font-semibold">Portrait Session</h3>
                        <p class="text-sm">Professional Headshots</p>
                    </div>
                </div>
            </div>
            
            <div class="group relative overflow-hidden rounded-lg shadow-lg">
                <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Commercial Photography" class="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300">
                <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div class="absolute bottom-4 left-4 text-white">
                        <h3 class="text-xl font-semibold">Commercial</h3>
                        <p class="text-sm">Product Photography</p>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="text-center mt-12">
            <a href="{{ route('portfolio.index') }}" class="bg-amber-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors">
                View Full Portfolio
            </a>
        </div>
    </div>
</section>

<!-- CTA Section -->
<section class="py-20 bg-amber-600">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-4xl font-serif font-bold text-white mb-6">Ready to Capture Your Moments?</h2>
        <p class="text-xl text-amber-100 mb-8">Let's create beautiful memories together. Book your session today!</p>
        <a href="{{ route('booking.index') }}" class="bg-white text-amber-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Book Your Session
        </a>
    </div>
</section>
@endsection
