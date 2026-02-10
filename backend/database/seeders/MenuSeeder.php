<?php

namespace Database\Seeders;

use App\Models\Menus;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class MenuSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $dashboard = Menus::create([
            'menu_name' => 'Dashboard',
            'menu_path' => '/dashboard'
        ]);

        $setup = Menus::create([
            'menu_name' => 'Setup',
            'menu_path' => '/setup'
        ]);

        Menus::insert([
            ['menu_name'=>'Users','menu_path'=>'/setup/users','menu_parent_id'=>$setup->id],
            ['menu_name'=>'Roles','menu_path'=>'/setup/roles','menu_parent_id'=>$setup->id],
            ['menu_name'=>'Menus','menu_path'=>'/setup/menus','menu_parent_id'=>$setup->id],
            ['menu_name'=>'Role Permissions','menu_path'=>'/setup/role-permissions','menu_parent_id'=>$setup->id],
            ['menu_name'=>'Change Password','menu_path'=>'/setup/change-password','menu_parent_id'=>$setup->id],
        ]);
    }
}
