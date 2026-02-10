<?php

namespace Database\Seeders;

use App\Models\Menus;
use App\Models\Roles;
use App\Models\RoleMenus;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class RoleMenuSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void {

        $admin = Roles::where('role_name','admin')->first();
        $user  = Roles::where('role_name','user')->first();

        $menus = Menus::all();

        foreach ($menus as $menu) {
            RoleMenus::create([
                'role_id' => $admin->id,
                'menu_id' => $menu->id,
            ]);
        }

        $changePassword = Menus::where('menu_path','/setup/change-password')->first();

        RoleMenus::create([
            'role_id' => $user->id,
            'menu_id' => $changePassword->id,
        ]);
    }
}
