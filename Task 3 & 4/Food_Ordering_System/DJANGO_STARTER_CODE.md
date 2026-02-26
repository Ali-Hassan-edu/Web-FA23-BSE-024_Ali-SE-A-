# Django Food Ordering System - Starter Code
## Phase 1: Models & Scaffolding

### Project Setup Commands

```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install Django
pip install django djangorestframework

# Create project and app
django-admin startproject config .
python manage.py startapp menu

# Run migrations
python manage.py migrate
```

---

## MODELS

### menu/models.py
```python
from django.db import models

class MenuItem(models.Model):
    CATEGORY_CHOICES = [
        ('appetizers', 'Appetizers'),
        ('entrees', 'Entrees'),
        ('desserts', 'Desserts'),
        ('beverages', 'Beverages'),
    ]
    
    name = models.CharField(max_length=200)
    description = models.TextField()
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    price = models.DecimalField(max_digits=8, decimal_places=2)
    available_status = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = "Menu Items"

    def __str__(self):
        return self.name


class Order(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('preparing', 'Preparing'),
        ('ready', 'Ready'),
        ('delivered', 'Delivered'),
        ('cancelled', 'Cancelled'),
    ]
    
    customer_name = models.CharField(max_length=200)
    order_date = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-order_date']

    def __str__(self):
        return f"Order #{self.id} - {self.customer_name}"


class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    menu_item = models.ForeignKey(MenuItem, on_delete=models.PROTECT)
    quantity = models.PositiveIntegerField()
    price_at_purchase = models.DecimalField(max_digits=8, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('order', 'menu_item')

    def __str__(self):
        return f"{self.menu_item.name} x {self.quantity}"
```

---

## ADMIN INTERFACE

### menu/admin.py
```python
from django.contrib import admin
from .models import MenuItem, Order, OrderItem

class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 1

@admin.register(MenuItem)
class MenuItemAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'category', 'price', 'available_status')
    list_filter = ('category', 'available_status')
    search_fields = ('name', 'description')

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'customer_name', 'order_date', 'status', 'total_price')
    list_filter = ('status', 'order_date')
    search_fields = ('customer_name',)
    inlines = [OrderItemInline]

@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = ('order', 'menu_item', 'quantity', 'price_at_purchase')
    list_filter = ('order__status',)
```

---

## VIEWS

### menu/views.py
```python
from django.shortcuts import render, redirect, get_object_or_404
from django.views.generic import ListView, DetailView, CreateView, UpdateView, DeleteView
from django.urls import reverse_lazy
from .models import MenuItem, Order, OrderItem

# MenuItem Views
class MenuItemListView(ListView):
    model = MenuItem
    template_name = 'menu/menuitem_list.html'
    context_object_name = 'items'
    paginate_by = 10

class MenuItemDetailView(DetailView):
    model = MenuItem
    template_name = 'menu/menuitem_detail.html'

class MenuItemCreateView(CreateView):
    model = MenuItem
    template_name = 'menu/menuitem_form.html'
    fields = ['name', 'description', 'category', 'price', 'available_status']
    success_url = reverse_lazy('menu:item-list')

class MenuItemUpdateView(UpdateView):
    model = MenuItem
    template_name = 'menu/menuitem_form.html'
    fields = ['name', 'description', 'category', 'price', 'available_status']
    success_url = reverse_lazy('menu:item-list')

class MenuItemDeleteView(DeleteView):
    model = MenuItem
    template_name = 'menu/menuitem_confirm_delete.html'
    success_url = reverse_lazy('menu:item-list')

# Order Views
class OrderListView(ListView):
    model = Order
    template_name = 'menu/order_list.html'
    context_object_name = 'orders'
    paginate_by = 20

class OrderDetailView(DetailView):
    model = Order
    template_name = 'menu/order_detail.html'

class OrderCreateView(CreateView):
    model = Order
    template_name = 'menu/order_form.html'
    fields = ['customer_name', 'status', 'total_price']
    success_url = reverse_lazy('menu:order-list')

class OrderUpdateView(UpdateView):
    model = Order
    template_name = 'menu/order_form.html'
    fields = ['customer_name', 'status', 'total_price']
    success_url = reverse_lazy('menu:order-list')

class OrderDeleteView(DeleteView):
    model = Order
    template_name = 'menu/order_confirm_delete.html'
    success_url = reverse_lazy('menu:order-list')
```

---

## URLS

### menu/urls.py
```python
from django.urls import path
from .views import (
    MenuItemListView, MenuItemDetailView, MenuItemCreateView, 
    MenuItemUpdateView, MenuItemDeleteView,
    OrderListView, OrderDetailView, OrderCreateView, 
    OrderUpdateView, OrderDeleteView
)

app_name = 'menu'

urlpatterns = [
    # Menu Items
    path('menu-items/', MenuItemListView.as_view(), name='item-list'),
    path('menu-items/<int:pk>/', MenuItemDetailView.as_view(), name='item-detail'),
    path('menu-items/create/', MenuItemCreateView.as_view(), name='item-create'),
    path('menu-items/<int:pk>/edit/', MenuItemUpdateView.as_view(), name='item-update'),
    path('menu-items/<int:pk>/delete/', MenuItemDeleteView.as_view(), name='item-delete'),
    
    # Orders
    path('orders/', OrderListView.as_view(), name='order-list'),
    path('orders/<int:pk>/', OrderDetailView.as_view(), name='order-detail'),
    path('orders/create/', OrderCreateView.as_view(), name='order-create'),
    path('orders/<int:pk>/edit/', OrderUpdateView.as_view(), name='order-update'),
    path('orders/<int:pk>/delete/', OrderDeleteView.as_view(), name='order-delete'),
]
```

### config/urls.py
```python
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('menu.urls')),
]
```

---

## SETTINGS

### config/settings.py (additions)
```python
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'menu',  # Add this
    'rest_framework',  # Add this for Phase 3
]

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}
```

---

## TEMPLATES

### templates/menu/menuitem_list.html
```html
<!DOCTYPE html>
<html>
<head>
    <title>Menu Items</title>
</head>
<body>
    <h1>Menu Items</h1>
    <a href="{% url 'menu:item-create' %}">Add New Item</a>
    
    <table border="1">
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Available</th>
            <th>Actions</th>
        </tr>
        {% for item in items %}
        <tr>
            <td>{{ item.id }}</td>
            <td>{{ item.name }}</td>
            <td>${{ item.price }}</td>
            <td>{{ item.get_category_display }}</td>
            <td>{% if item.available_status %}Yes{% else %}No{% endif %}</td>
            <td>
                <a href="{% url 'menu:item-detail' item.id %}">View</a>
                <a href="{% url 'menu:item-update' item.id %}">Edit</a>
                <a href="{% url 'menu:item-delete' item.id %}">Delete</a>
            </td>
        </tr>
        {% endfor %}
    </table>
</body>
</html>
```

### templates/menu/menuitem_form.html
```html
<!DOCTYPE html>
<html>
<head>
    <title>Menu Item Form</title>
</head>
<body>
    <h1>{% if form.instance.pk %}Edit{% else %}Create{% endif %} Menu Item</h1>
    
    <form method="post">
        {% csrf_token %}
        {{ form.as_p }}
        <button type="submit">Save</button>
        <a href="{% url 'menu:item-list' %}">Cancel</a>
    </form>
</body>
</html>
```

### templates/menu/order_list.html
```html
<!DOCTYPE html>
<html>
<head>
    <title>Orders</title>
</head>
<body>
    <h1>Orders</h1>
    <a href="{% url 'menu:order-create' %}">Create New Order</a>
    
    <table border="1">
        <tr>
            <th>ID</th>
            <th>Customer</th>
            <th>Date</th>
            <th>Status</th>
            <th>Total</th>
            <th>Actions</th>
        </tr>
        {% for order in orders %}
        <tr>
            <td>{{ order.id }}</td>
            <td>{{ order.customer_name }}</td>
            <td>{{ order.order_date }}</td>
            <td>{{ order.get_status_display }}</td>
            <td>${{ order.total_price }}</td>
            <td>
                <a href="{% url 'menu:order-detail' order.id %}">View</a>
                <a href="{% url 'menu:order-update' order.id %}">Edit</a>
                <a href="{% url 'menu:order-delete' order.id %}">Delete</a>
            </td>
        </tr>
        {% endfor %}
    </table>
</body>
</html>
```

---

## MIGRATIONS

```bash
# Create migrations
python manage.py makemigrations

# Apply migrations
python manage.py migrate

# Create superuser for admin
python manage.py createsuperuser

# Run development server
python manage.py runserver
```

---

## NEXT STEPS

1. Run migrations with `python manage.py migrate`
2. Create superuser with `python manage.py createsuperuser`
3. Access admin interface at http://localhost:8000/admin
4. Test CRUD operations via admin interface
5. Proceed to Phase 2: Bootstrap Integration

---
