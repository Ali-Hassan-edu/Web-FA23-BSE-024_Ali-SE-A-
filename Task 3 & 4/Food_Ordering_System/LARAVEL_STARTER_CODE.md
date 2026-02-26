# Laravel Food Ordering System - Starter Code
## Phase 1: Models & Scaffolding

### Project Setup Commands

```bash
# Create new Laravel project
composer create-project laravel/laravel food-ordering-system
cd food-ordering-system

# Create database
php artisan migrate:fresh

# Generate Models with Migrations
php artisan make:model MenuItem -m
php artisan make:model Order -m
php artisan make:model OrderItem -m

# Generate Resource Controllers
php artisan make:controller MenuItemController --resource
php artisan make:controller OrderController --resource
```

---

## DATABASE MIGRATIONS

### database/migrations/create_menu_items_table.php
```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('menu_items', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description');
            $table->string('category');
            $table->decimal('price', 8, 2);
            $table->boolean('available_status')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('menu_items');
    }
};
?>
```

### database/migrations/create_orders_table.php
```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('customer_name');
            $table->timestamp('order_date')->useCurrent();
            $table->enum('status', ['pending', 'preparing', 'ready', 'delivered', 'cancelled'])->default('pending');
            $table->decimal('total_price', 10, 2);
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('orders');
    }
};
?>
```

### database/migrations/create_order_items_table.php
```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('order_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained()->onDelete('cascade');
            $table->foreignId('menu_item_id')->constrained();
            $table->integer('quantity');
            $table->decimal('price_at_purchase', 8, 2);
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('order_items');
    }
};
?>
```

---

## MODELS

### app/Models/MenuItem.php
```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class MenuItem extends Model {
    protected $fillable = ['name', 'description', 'category', 'price', 'available_status'];
    protected $casts = ['available_status' => 'boolean'];

    public function orderItems(): HasMany {
        return $this->hasMany(OrderItem::class, 'menu_item_id');
    }
}
?>
```

### app/Models/Order.php
```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Order extends Model {
    protected $fillable = ['customer_name', 'order_date', 'status', 'total_price'];

    public function orderItems(): HasMany {
        return $this->hasMany(OrderItem::class);
    }
}
?>
```

### app/Models/OrderItem.php
```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class OrderItem extends Model {
    protected $fillable = ['order_id', 'menu_item_id', 'quantity', 'price_at_purchase'];

    public function order(): BelongsTo {
        return $this->belongsTo(Order::class);
    }

    public function menuItem(): BelongsTo {
        return $this->belongsTo(MenuItem::class, 'menu_item_id');
    }
}
?>
```

---

## ROUTES

### routes/web.php
```php
<?php

use App\Http\Controllers\MenuItemController;
use App\Http\Controllers\OrderController;
use Illuminate\Support\Facades\Route;

Route::resource('menu-items', MenuItemController);
Route::resource('orders', OrderController);

Route::get('/', function () {
    return redirect('/menu-items');
});
?>
```

---

## CONTROLLERS

### app/Http/Controllers/MenuItemController.php
```php
<?php

namespace App\Http\Controllers;

use App\Models\MenuItem;
use Illuminate\Http\Request;

class MenuItemController extends Controller {
    public function index() {
        $items = MenuItem::all();
        return view('menu-items.index', compact('items'));
    }

    public function create() {
        return view('menu-items.create');
    }

    public function store(Request $request) {
        MenuItem::create($request->validate([
            'name' => 'required|string',
            'description' => 'required|string',
            'category' => 'required|string',
            'price' => 'required|numeric',
            'available_status' => 'boolean'
        ]));

        return redirect('/menu-items')->with('success', 'MenuItem created successfully');
    }

    public function show(MenuItem $menuItem) {
        return view('menu-items.show', compact('menuItem'));
    }

    public function edit(MenuItem $menuItem) {
        return view('menu-items.edit', compact('menuItem'));
    }

    public function update(Request $request, MenuItem $menuItem) {
        $menuItem->update($request->validate([
            'name' => 'required|string',
            'description' => 'required|string',
            'category' => 'required|string',
            'price' => 'required|numeric',
            'available_status' => 'boolean'
        ]));

        return redirect('/menu-items')->with('success', 'MenuItem updated successfully');
    }

    public function destroy(MenuItem $menuItem) {
        $menuItem->delete();
        return redirect('/menu-items')->with('success', 'MenuItem deleted successfully');
    }
}
?>
```

### app/Http/Controllers/OrderController.php
```php
<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\MenuItem;
use Illuminate\Http\Request;

class OrderController extends Controller {
    public function index() {
        $orders = Order::with('orderItems')->get();
        return view('orders.index', compact('orders'));
    }

    public function create() {
        $items = MenuItem::where('available_status', true)->get();
        return view('orders.create', compact('items'));
    }

    public function store(Request $request) {
        $order = Order::create($request->validate([
            'customer_name' => 'required|string',
            'status' => 'required|in:pending,preparing,ready,delivered,cancelled',
            'total_price' => 'required|numeric'
        ]));

        return redirect('/orders')->with('success', 'Order created successfully');
    }

    public function show(Order $order) {
        return view('orders.show', compact('order'));
    }

    public function edit(Order $order) {
        return view('orders.edit', compact('order'));
    }

    public function update(Request $request, Order $order) {
        $order->update($request->validate([
            'customer_name' => 'required|string',
            'status' => 'required|in:pending,preparing,ready,delivered,cancelled',
            'total_price' => 'required|numeric'
        ]));

        return redirect('/orders')->with('success', 'Order updated successfully');
    }

    public function destroy(Order $order) {
        $order->delete();
        return redirect('/orders')->with('success', 'Order deleted successfully');
    }
}
?>
```

---

## VIEWS (Blade Templates)

### resources/views/menu-items/index.blade.php
```html
<!DOCTYPE html>
<html>
<head>
    <title>Menu Items</title>
</head>
<body>
    <h1>Menu Items</h1>
    <a href="/menu-items/create">Add New Item</a>
    
    <table border="1">
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Available</th>
            <th>Actions</th>
        </tr>
        @foreach($items as $item)
        <tr>
            <td>{{ $item->id }}</td>
            <td>{{ $item->name }}</td>
            <td>${{ $item->price }}</td>
            <td>{{ $item->category }}</td>
            <td>{{ $item->available_status ? 'Yes' : 'No' }}</td>
            <td>
                <a href="/menu-items/{{ $item->id }}">View</a>
                <a href="/menu-items/{{ $item->id }}/edit">Edit</a>
                <form method="POST" action="/menu-items/{{ $item->id }}" style="display:inline;">
                    @csrf
                    @method('DELETE')
                    <button type="submit">Delete</button>
                </form>
            </td>
        </tr>
        @endforeach
    </table>
</body>
</html>
```

### resources/views/menu-items/create.blade.php
```html
<!DOCTYPE html>
<html>
<head>
    <title>Create Menu Item</title>
</head>
<body>
    <h1>Create Menu Item</h1>
    
    <form method="POST" action="/menu-items">
        @csrf
        <label>Name: <input type="text" name="name" required></label><br>
        <label>Description: <textarea name="description" required></textarea></label><br>
        <label>Category: <input type="text" name="category" required></label><br>
        <label>Price: <input type="number" step="0.01" name="price" required></label><br>
        <label>Available: <input type="checkbox" name="available_status" checked></label><br>
        <button type="submit">Create</button>
    </form>
</body>
</html>
```

---

## NEXT STEPS

1. Run `php artisan migrate` to create tables
2. Test CRUD operations via the web interface
3. Proceed to Phase 2: Bootstrap Integration

---
