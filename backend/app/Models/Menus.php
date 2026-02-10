<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Menus extends Model
{
    protected $table = 'menus';
    protected $fillable = [
        'menu_name',
        'menu_path',
        'menu_icon',
        'menu_parent_id',
        'menu_order',
    ];
}
