<?php

namespace Database\Seeders;

use App\Models\User;
use Database\Seeders\CompanySeeder;
use Database\Seeders\MenuSeeder;
use Database\Seeders\RoleMenuSeeder;
use Database\Seeders\RoleSeeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        $this->call([
            RoleSeeder::class,
            MenuSeeder::class,
            RoleMenuSeeder::class,
            CompanySeeder::class
        ]);

        User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@gmail.com',
            'password' => '123456', // password akan otomatis di-hash karena ada cast di model
            'role_id' => 1
        ]);
    }
}
