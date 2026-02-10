<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email'    => 'required|email',
            'password' => 'required',
        ]);

        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json([
                'data' => null,
                'message' => 'Invalid credentials',
                'errors' => ['auth' => ['Email or password incorrect']]
            ], 401);
        }

        $user = $request->user();

        // hapus token lama (opsional tapi rapi)
        $user->tokens()->delete();

        $token = $user->createToken('cms-token')->plainTextToken;

        return response()->json([
            'data' => [
                'token' => $token,
                'user'  => $user,
            ],
            'message' => 'Login successful',
            'errors' => null,
        ]);
    }

    public function me(Request $request)
    {
        return response()->json([
            'data' => $request->user(),
            'message' => 'OK',
            'errors' => null,
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'data' => null,
            'message' => 'Logged out',
            'errors' => null,
        ]);
    }
}
