# QuickBite — Laravel Starter Code
## Stage 1: Database Models & Scaffolding

---

### Project Setup

```bash
# Create a new Laravel project
composer create-project laravel/laravel quickbite
cd quickbite

# Generate Models + Migrations
php artisan make:model Dish -m
php artisan make:model CustomerOrder -m
php artisan make:model OrderLine -m

# Generate Resource Controllers
php artisan make:controller DishController --resource
php artisan make:controller CustomerOrderController --resource

# Run all migrations
php artisan migrate
```

---

## MIGRATIONS

### database/migrations/xxxx_create_dishes_table.php

```php
<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('dishes', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description');
            $table->string('dish_type');
            $table->decimal('unit_price', 8, 2);
            $table->boolean('is_available')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('dishes');
    }
};
```

### database/migrations/xxxx_create_customer_orders_table.php

```php
<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('customer_orders', function (Blueprint $table) {
            $table->id();
            $table->string('buyer_name');
            $table->timestamp('placed_at')->useCurrent();
            $table->enum('order_status', [
                'waiting', 'in_kitchen', 'out_for_delivery', 'completed', 'voided'
            ])->default('waiting');
            $table->decimal('amount_due', 10, 2);
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('customer_orders');
    }
};
```

### database/migrations/xxxx_create_order_lines_table.php

```php
<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('order_lines', function (Blueprint $table) {
            $table->id();
            $table->foreignId('customer_order_id')->constrained('customer_orders')->onDelete('cascade');
            $table->foreignId('dish_id')->constrained('dishes');
            $table->unsignedInteger('qty');
            $table->decimal('locked_price', 8, 2);
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('order_lines');
    }
};
```

---

## MODELS

### app/Models/Dish.php

```php
<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Dish extends Model {
    protected $fillable = ['title', 'description', 'dish_type', 'unit_price', 'is_available'];

    protected $casts = [
        'is_available' => 'boolean',
        'unit_price' => 'decimal:2',
    ];

    /** All order lines that reference this dish */
    public function orderLines(): HasMany {
        return $this->hasMany(OrderLine::class);
    }
}
```

### app/Models/CustomerOrder.php

```php
<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class CustomerOrder extends Model {
    protected $fillable = ['buyer_name', 'placed_at', 'order_status', 'amount_due'];

    protected $casts = ['placed_at' => 'datetime'];

    /** All line items in this order */
    public function lines(): HasMany {
        return $this->hasMany(OrderLine::class);
    }
}
```

### app/Models/OrderLine.php

```php
<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class OrderLine extends Model {
    protected $fillable = ['customer_order_id', 'dish_id', 'qty', 'locked_price'];

    public function customerOrder(): BelongsTo {
        return $this->belongsTo(CustomerOrder::class);
    }

    public function dish(): BelongsTo {
        return $this->belongsTo(Dish::class);
    }

    public function lineTotal(): float {
        return $this->qty * $this->locked_price;
    }
}
```

---

## ROUTES

### routes/web.php

```php
<?php
use App\Http\Controllers\DishController;
use App\Http\Controllers\CustomerOrderController;
use Illuminate\Support\Facades\Route;

// Redirect root to dish catalog
Route::get('/', fn() => redirect('/dishes'));

// RESTful resource routes
Route::resource('dishes', DishController::class);
Route::resource('customer-orders', CustomerOrderController::class);
```

---

## CONTROLLERS

### app/Http/Controllers/DishController.php

```php
<?php
namespace App\Http\Controllers;

use App\Models\Dish;
use Illuminate\Http\Request;

class DishController extends Controller {

    public function index() {
        $dishes = Dish::orderBy('dish_type')->get();
        return view('dishes.index', compact('dishes'));
    }

    public function create() {
        return view('dishes.create');
    }

    public function store(Request $request) {
        $data = $request->validate([
            'title'        => 'required|string|max:200',
            'description'  => 'required|string',
            'dish_type'    => 'required|in:starters,mains,sweets,drinks',
            'unit_price'   => 'required|numeric|min:0',
            'is_available' => 'nullable|boolean',
        ]);

        $data['is_available'] = $request->has('is_available');
        Dish::create($data);

        return redirect('/dishes')->with('success', 'Dish added to the catalog.');
    }

    public function show(Dish $dish) {
        return view('dishes.show', compact('dish'));
    }

    public function edit(Dish $dish) {
        return view('dishes.edit', compact('dish'));
    }

    public function update(Request $request, Dish $dish) {
        $data = $request->validate([
            'title'        => 'required|string|max:200',
            'description'  => 'required|string',
            'dish_type'    => 'required|in:starters,mains,sweets,drinks',
            'unit_price'   => 'required|numeric|min:0',
            'is_available' => 'nullable|boolean',
        ]);

        $data['is_available'] = $request->has('is_available');
        $dish->update($data);

        return redirect('/dishes')->with('success', 'Dish updated successfully.');
    }

    public function destroy(Dish $dish) {
        $dish->delete();
        return redirect('/dishes')->with('success', 'Dish removed from catalog.');
    }
}
```

### app/Http/Controllers/CustomerOrderController.php

```php
<?php
namespace App\Http\Controllers;

use App\Models\CustomerOrder;
use App\Models\Dish;
use Illuminate\Http\Request;

class CustomerOrderController extends Controller {

    public function index() {
        $orders = CustomerOrder::with('lines.dish')->latest('placed_at')->get();
        return view('customer-orders.index', compact('orders'));
    }

    public function create() {
        $availableDishes = Dish::where('is_available', true)->get();
        return view('customer-orders.create', compact('availableDishes'));
    }

    public function store(Request $request) {
        CustomerOrder::create($request->validate([
            'buyer_name'   => 'required|string|max:200',
            'order_status' => 'required|in:waiting,in_kitchen,out_for_delivery,completed,voided',
            'amount_due'   => 'required|numeric|min:0',
        ]));

        return redirect('/customer-orders')->with('success', 'Order placed successfully.');
    }

    public function show(CustomerOrder $customerOrder) {
        $customerOrder->load('lines.dish');
        return view('customer-orders.show', compact('customerOrder'));
    }

    public function edit(CustomerOrder $customerOrder) {
        return view('customer-orders.edit', compact('customerOrder'));
    }

    public function update(Request $request, CustomerOrder $customerOrder) {
        $customerOrder->update($request->validate([
            'buyer_name'   => 'required|string|max:200',
            'order_status' => 'required|in:waiting,in_kitchen,out_for_delivery,completed,voided',
            'amount_due'   => 'required|numeric|min:0',
        ]));

        return redirect('/customer-orders')->with('success', 'Order updated.');
    }

    public function destroy(CustomerOrder $customerOrder) {
        $customerOrder->delete();
        return redirect('/customer-orders')->with('success', 'Order cancelled.');
    }
}
```

---

## BLADE TEMPLATES

### resources/views/dishes/index.blade.php

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>QuickBite — Dish Catalog</title>
</head>
<body>
    <h1>Dish Catalog</h1>
    <a href="/dishes/create">+ Add New Dish</a>

    @if(session('success'))
        <p style="color:green">{{ session('success') }}</p>
    @endif

    <table border="1" cellpadding="6">
        <thead>
            <tr>
                <th>#</th><th>Title</th><th>Type</th>
                <th>Price</th><th>Available</th><th>Actions</th>
            </tr>
        </thead>
        <tbody>
            @forelse($dishes as $dish)
            <tr>
                <td>{{ $dish->id }}</td>
                <td>{{ $dish->title }}</td>
                <td>{{ $dish->dish_type }}</td>
                <td>${{ $dish->unit_price }}</td>
                <td>{{ $dish->is_available ? 'Yes' : 'No' }}</td>
                <td>
                    <a href="/dishes/{{ $dish->id }}">View</a>
                    <a href="/dishes/{{ $dish->id }}/edit">Edit</a>
                    <form method="POST" action="/dishes/{{ $dish->id }}" style="display:inline">
                        @csrf
                        @method('DELETE')
                        <button type="submit" onclick="return confirm('Remove this dish?')">Delete</button>
                    </form>
                </td>
            </tr>
            @empty
            <tr><td colspan="6">No dishes yet.</td></tr>
            @endforelse
        </tbody>
    </table>
</body>
</html>
```

### resources/views/dishes/create.blade.php

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>QuickBite — Add Dish</title>
</head>
<body>
    <h1>Add New Dish</h1>

    <form method="POST" action="/dishes">
        @csrf
        <div>
            <label>Title: <input type="text" name="title" required></label>
        </div>
        <div>
            <label>Description:<br><textarea name="description" rows="3" required></textarea></label>
        </div>
        <div>
            <label>Type:
                <select name="dish_type" required>
                    <option value="starters">Starters</option>
                    <option value="mains">Mains</option>
                    <option value="sweets">Sweets</option>
                    <option value="drinks">Drinks</option>
                </select>
            </label>
        </div>
        <div>
            <label>Price ($): <input type="number" name="unit_price" step="0.01" min="0" required></label>
        </div>
        <div>
            <label><input type="checkbox" name="is_available" checked> Available</label>
        </div>
        <button type="submit">Save Dish</button>
        <a href="/dishes">Cancel</a>
    </form>
</body>
</html>
```

---

## NEXT STEPS

1. Run `php artisan migrate` to set up the database
2. Open your browser to `http://localhost:8000/dishes`
3. Test adding, editing, and deleting dishes
4. Do the same for customer orders at `/customer-orders`
5. Commit: `git commit -m "Stage 1: models, migrations, controllers, and views"`
6. Tag: `git tag stage-1`
7. Proceed to Stage 2: Bootstrap integration

---
