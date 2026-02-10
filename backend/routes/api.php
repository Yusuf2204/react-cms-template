<?php

use Illuminate\Support\Facades\Route;

// Route Controllers
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;

// MAIN
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);

    // Setup
    Route::apiResource('users', UserController::class);
});
