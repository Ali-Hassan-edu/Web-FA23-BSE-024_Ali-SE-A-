# QuickBite — Django Starter Code
## Stage 1: Database Models & Scaffolding

---

### Environment Setup

```bash
# Create and activate a virtual environment
python -m venv env
source env/bin/activate        # Windows: env\Scripts\activate

# Install required packages
pip install django djangorestframework

# Start the project and app
django-admin startproject quickbite_project .
python manage.py startapp catalog

# Apply initial migrations
python manage.py migrate
```

---

## DATA MODELS

### catalog/models.py

```python
from django.db import models


class Dish(models.Model):
    """Represents a single item on the restaurant menu."""

    TYPE_CHOICES = [
        ('starters', 'Starters'),
        ('mains', 'Mains'),
        ('sweets', 'Sweets'),
        ('drinks', 'Drinks'),
    ]

    title = models.CharField(max_length=200)
    description = models.TextField()
    dish_type = models.CharField(max_length=60, choices=TYPE_CHOICES)
    unit_price = models.DecimalField(max_digits=8, decimal_places=2)
    is_available = models.BooleanField(default=True)
    added_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = "Dishes"
        ordering = ['dish_type', 'title']

    def __str__(self):
        return f"{self.title} ({self.get_dish_type_display()})"


class CustomerOrder(models.Model):
    """Represents a food order placed by a customer."""

    STATUS_OPTIONS = [
        ('waiting', 'Waiting'),
        ('in_kitchen', 'In Kitchen'),
        ('out_for_delivery', 'Out for Delivery'),
        ('completed', 'Completed'),
        ('voided', 'Voided'),
    ]

    buyer_name = models.CharField(max_length=200)
    placed_at = models.DateTimeField(auto_now_add=True)
    order_status = models.CharField(
        max_length=20, choices=STATUS_OPTIONS, default='waiting'
    )
    amount_due = models.DecimalField(max_digits=10, decimal_places=2)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-placed_at']

    def __str__(self):
        return f"Order #{self.pk} — {self.buyer_name} [{self.order_status}]"


class OrderLine(models.Model):
    """A single dish entry within a customer order."""

    customer_order = models.ForeignKey(
        CustomerOrder, on_delete=models.CASCADE, related_name='lines'
    )
    dish = models.ForeignKey(Dish, on_delete=models.PROTECT)
    qty = models.PositiveIntegerField()
    locked_price = models.DecimalField(max_digits=8, decimal_places=2)
    recorded_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('customer_order', 'dish')

    def __str__(self):
        return f"{self.dish.title} × {self.qty} @ ${self.locked_price}"

    def line_total(self):
        return self.qty * self.locked_price
```

---

## ADMIN PANEL CONFIGURATION

### catalog/admin.py

```python
from django.contrib import admin
from .models import Dish, CustomerOrder, OrderLine


class OrderLineInline(admin.TabularInline):
    model = OrderLine
    extra = 1
    readonly_fields = ('recorded_at',)


@admin.register(Dish)
class DishAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'dish_type', 'unit_price', 'is_available')
    list_filter = ('dish_type', 'is_available')
    search_fields = ('title', 'description')
    list_editable = ('is_available',)


@admin.register(CustomerOrder)
class CustomerOrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'buyer_name', 'placed_at', 'order_status', 'amount_due')
    list_filter = ('order_status',)
    search_fields = ('buyer_name',)
    inlines = [OrderLineInline]


@admin.register(OrderLine)
class OrderLineAdmin(admin.ModelAdmin):
    list_display = ('customer_order', 'dish', 'qty', 'locked_price')
    list_filter = ('customer_order__order_status',)
```

---

## VIEWS

### catalog/views.py

```python
from django.shortcuts import render, redirect, get_object_or_404
from django.views.generic import (
    ListView, DetailView, CreateView, UpdateView, DeleteView
)
from django.urls import reverse_lazy
from .models import Dish, CustomerOrder, OrderLine


# ──────────────────────────────────────────────
# Dish Views
# ──────────────────────────────────────────────

class DishListView(ListView):
    model = Dish
    template_name = 'catalog/dish_list.html'
    context_object_name = 'dishes'
    paginate_by = 12


class DishDetailView(DetailView):
    model = Dish
    template_name = 'catalog/dish_detail.html'
    context_object_name = 'dish'


class DishCreateView(CreateView):
    model = Dish
    template_name = 'catalog/dish_form.html'
    fields = ['title', 'description', 'dish_type', 'unit_price', 'is_available']
    success_url = reverse_lazy('catalog:dish-list')


class DishUpdateView(UpdateView):
    model = Dish
    template_name = 'catalog/dish_form.html'
    fields = ['title', 'description', 'dish_type', 'unit_price', 'is_available']
    success_url = reverse_lazy('catalog:dish-list')


class DishDeleteView(DeleteView):
    model = Dish
    template_name = 'catalog/dish_confirm_delete.html'
    success_url = reverse_lazy('catalog:dish-list')


# ──────────────────────────────────────────────
# CustomerOrder Views
# ──────────────────────────────────────────────

class OrderListView(ListView):
    model = CustomerOrder
    template_name = 'catalog/order_list.html'
    context_object_name = 'orders'
    paginate_by = 20


class OrderDetailView(DetailView):
    model = CustomerOrder
    template_name = 'catalog/order_detail.html'
    context_object_name = 'order'

    def get_context_data(self, **kwargs):
        ctx = super().get_context_data(**kwargs)
        ctx['lines'] = self.object.lines.select_related('dish')
        return ctx


class OrderCreateView(CreateView):
    model = CustomerOrder
    template_name = 'catalog/order_form.html'
    fields = ['buyer_name', 'order_status', 'amount_due']
    success_url = reverse_lazy('catalog:order-list')


class OrderUpdateView(UpdateView):
    model = CustomerOrder
    template_name = 'catalog/order_form.html'
    fields = ['buyer_name', 'order_status', 'amount_due']
    success_url = reverse_lazy('catalog:order-list')


class OrderDeleteView(DeleteView):
    model = CustomerOrder
    template_name = 'catalog/order_confirm_delete.html'
    success_url = reverse_lazy('catalog:order-list')
```

---

## URL ROUTING

### catalog/urls.py

```python
from django.urls import path
from .views import (
    DishListView, DishDetailView, DishCreateView, DishUpdateView, DishDeleteView,
    OrderListView, OrderDetailView, OrderCreateView, OrderUpdateView, OrderDeleteView,
)

app_name = 'catalog'

urlpatterns = [
    # ── Dishes ──────────────────────────────────────
    path('dishes/', DishListView.as_view(), name='dish-list'),
    path('dishes/<int:pk>/', DishDetailView.as_view(), name='dish-detail'),
    path('dishes/new/', DishCreateView.as_view(), name='dish-create'),
    path('dishes/<int:pk>/edit/', DishUpdateView.as_view(), name='dish-update'),
    path('dishes/<int:pk>/remove/', DishDeleteView.as_view(), name='dish-delete'),

    # ── Customer Orders ──────────────────────────────
    path('customer-orders/', OrderListView.as_view(), name='order-list'),
    path('customer-orders/<int:pk>/', OrderDetailView.as_view(), name='order-detail'),
    path('customer-orders/new/', OrderCreateView.as_view(), name='order-create'),
    path('customer-orders/<int:pk>/edit/', OrderUpdateView.as_view(), name='order-update'),
    path('customer-orders/<int:pk>/remove/', OrderDeleteView.as_view(), name='order-delete'),
]
```

### quickbite_project/urls.py

```python
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('catalog.urls')),
]
```

---

## SETTINGS UPDATES

### quickbite_project/settings.py (add to INSTALLED_APPS)

```python
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'catalog',           # ← Your app
    'rest_framework',    # ← For Stage 3 API work
]

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'quickbite.db',
    }
}
```

---

## BASIC TEMPLATES (Stage 1 — No Styling Yet)

### templates/catalog/dish_list.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>QuickBite — Dishes</title>
</head>
<body>
    <h1>All Dishes</h1>
    <a href="{% url 'catalog:dish-create' %}">+ Add New Dish</a>

    <table border="1" cellpadding="6">
        <thead>
            <tr>
                <th>#</th>
                <th>Title</th>
                <th>Type</th>
                <th>Price</th>
                <th>Available</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {% for dish in dishes %}
            <tr>
                <td>{{ dish.id }}</td>
                <td>{{ dish.title }}</td>
                <td>{{ dish.get_dish_type_display }}</td>
                <td>${{ dish.unit_price }}</td>
                <td>{% if dish.is_available %}Yes{% else %}No{% endif %}</td>
                <td>
                    <a href="{% url 'catalog:dish-detail' dish.id %}">View</a> |
                    <a href="{% url 'catalog:dish-update' dish.id %}">Edit</a> |
                    <a href="{% url 'catalog:dish-delete' dish.id %}">Delete</a>
                </td>
            </tr>
            {% empty %}
            <tr><td colspan="6">No dishes found.</td></tr>
            {% endfor %}
        </tbody>
    </table>
</body>
</html>
```

### templates/catalog/dish_form.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>QuickBite — {% if form.instance.pk %}Edit{% else %}Add{% endif %} Dish</title>
</head>
<body>
    <h1>{% if form.instance.pk %}Edit Dish{% else %}Add New Dish{% endif %}</h1>

    <form method="post">
        {% csrf_token %}
        {{ form.as_p }}
        <button type="submit">Save Dish</button>
        <a href="{% url 'catalog:dish-list' %}">Cancel</a>
    </form>
</body>
</html>
```

### templates/catalog/order_list.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>QuickBite — Orders</title>
</head>
<body>
    <h1>Customer Orders</h1>
    <a href="{% url 'catalog:order-create' %}">+ New Order</a>

    <table border="1" cellpadding="6">
        <thead>
            <tr>
                <th>#</th>
                <th>Buyer</th>
                <th>Placed At</th>
                <th>Status</th>
                <th>Amount Due</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {% for order in orders %}
            <tr>
                <td>{{ order.id }}</td>
                <td>{{ order.buyer_name }}</td>
                <td>{{ order.placed_at|date:"Y-m-d H:i" }}</td>
                <td>{{ order.get_order_status_display }}</td>
                <td>${{ order.amount_due }}</td>
                <td>
                    <a href="{% url 'catalog:order-detail' order.id %}">View</a> |
                    <a href="{% url 'catalog:order-update' order.id %}">Edit</a> |
                    <a href="{% url 'catalog:order-delete' order.id %}">Cancel</a>
                </td>
            </tr>
            {% empty %}
            <tr><td colspan="6">No orders yet.</td></tr>
            {% endfor %}
        </tbody>
    </table>
</body>
</html>
```

---

## RUNNING THE PROJECT

```bash
# Create and apply migrations
python manage.py makemigrations
python manage.py migrate

# Create admin superuser
python manage.py createsuperuser

# Start the dev server
python manage.py runserver
```

Then visit:
- http://localhost:8000/dishes/ — Dish listing
- http://localhost:8000/customer-orders/ — Orders listing
- http://localhost:8000/admin/ — Admin panel

---

## NEXT STEPS

After confirming Stage 1 works:
1. Test all CRUD flows through the browser
2. Commit your progress with `git commit -m "Stage 1: models, views, and basic templates complete"`
3. Tag the stage: `git tag stage-1`
4. Move on to Stage 2: adding Bootstrap to all templates

---
