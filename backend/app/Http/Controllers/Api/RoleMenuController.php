<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Menus;
use App\Models\RoleMenus;
use App\Models\Roles;
use Illuminate\Http\Request;

class RoleMenuController extends Controller
{
    public function show($roleId)
    {
        $role = Roles::with('menus')->findOrFail($roleId);

        $allowedIds = $role->menus->pluck('id')->toArray();

        $allMenus = Menus::orderBy('menu_order')->get();

        $tree = $this->buildTreeWithChecked($allMenus, $allowedIds);

        return response()->json([
            'data' => $tree,
            'message' => 'OK',
            'errors' => null
        ]);
    }

    public function store(Request $request, $roleId)
    {
        $menuIds = $request->menu_ids ?? [];

        // hapus lama
        RoleMenus::where('role_id', $roleId)->delete();

        // insert baru
        foreach ($menuIds as $menuId) {
            RoleMenus::create([
                'role_id' => $roleId,
                'menu_id' => $menuId,
            ]);
        }

        return response()->json([
            'data' => true,
            'message' => 'Permissions updated',
            'errors' => null
        ]);
    }

    private function buildTree($menus)
    {
        $menusArray = $menus->map(function ($menu) {
            return [
                'id' => $menu->id,
                'menu_name' => $menu->menu_name,
                'menu_path' => $menu->menu_path,
                'menu_icon' => $menu->menu_icon,
                'menu_parent_id' => $menu->menu_parent_id,
                'menu_order' => $menu->menu_order,
                'children' => []
            ];
        })->toArray();

        $map = [];
        $roots = [];

        foreach ($menusArray as &$menu) {
            $map[$menu['id']] = &$menu;
        }

        foreach ($menusArray as &$menu) {
            if ($menu['menu_parent_id']) {
                if (isset($map[$menu['menu_parent_id']])) {
                    $map[$menu['menu_parent_id']]['children'][] = &$menu;
                }
            } else {
                $roots[] = &$menu;
            }
        }

        return $roots;
    }

    private function buildTreeWithChecked($menus, $allowedIds)
    {
        $menusArray = $menus->map(function ($menu) use ($allowedIds) {
            return [
                'id' => $menu->id,
                'menu_name' => $menu->menu_name,
                'menu_path' => $menu->menu_path,
                'menu_icon' => $menu->menu_icon,
                'menu_parent_id' => $menu->menu_parent_id,
                'menu_order' => $menu->menu_order,
                'checked' => in_array($menu->id, $allowedIds),
                'children' => []
            ];
        })->toArray();

        $map = [];
        $roots = [];

        foreach ($menusArray as &$menu) {
            $map[$menu['id']] = &$menu;
        }

        foreach ($menusArray as &$menu) {
            if ($menu['menu_parent_id']) {
                if (isset($map[$menu['menu_parent_id']])) {
                    $map[$menu['menu_parent_id']]['children'][] = &$menu;
                }
            } else {
                $roots[] = &$menu;
            }
        }

        return $roots;
    }
}
