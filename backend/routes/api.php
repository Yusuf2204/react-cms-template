<?php

use App\Http\Controllers\Api\AuthController;

// Route Controllers
use App\Http\Controllers\Api\RoleController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Support\Facades\Route;

// MAIN
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);

    // Setup
    Route::apiResource('users', UserController::class);
    Route::apiResource('roles', RoleController::class)->except(['show']);
});
