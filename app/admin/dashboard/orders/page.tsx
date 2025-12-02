'use client';
import Link from 'next/link';

import { useEffect, useState } from 'react';
import { Package, DollarSign, User, Mail, Calendar, Check, X, ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';

interface OrderItem {
  product: {
    name: string;
    type: string;
  };
  quantity: number;
  price: number;
}

interface Order {
  _id: string;
  customerName: string;
  customerEmail: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: string;
}

export default function OrdersManagement() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed' | 'cancelled'>('all');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/orders');
      const data = await response.json();
      // Sort by newest first
      const sorted = data.sort((a: Order, b: Order) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setOrders(sorted);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateOrderStatus = async (id: string, status: 'pending' | 'completed' | 'cancelled') => {
    try {
      const response = await fetch(`/api/orders?id=${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        await fetchOrders();
      }
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  const filteredOrders = filter === 'all' 
    ? orders 
    : orders.filter(order => order.status === filter);

  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    completed: orders.filter(o => o.status === 'completed').length,
    revenue: orders
      .filter(o => o.status === 'completed')
      .reduce((sum, o) => sum + o.totalAmount, 0),
  };

  if (isLoading) {
    return <div className="text-center py-12">Loading orders...</div>;
  }

  return (
    <div>
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Total Orders</p>
            <Package className="w-5 h-5 text-blue-500" />
          </div>
          <p className="text-3xl font-bold text-rich-brown">{stats.total}</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Pending</p>
            <Package className="w-5 h-5 text-yellow-500" />
          </div>
          <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Completed</p>
            <Check className="w-5 h-5 text-green-500" />
          </div>
          <p className="text-3xl font-bold text-green-600">{stats.completed}</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Revenue</p>
            <DollarSign className="w-5 h-5 text-green-500" />
          </div>
          <p className="text-3xl font-bold text-green-600">
            ${stats.revenue.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
        <div className="flex border-b border-gray-200">
          {(['all', 'pending', 'completed', 'cancelled'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-6 py-3 font-medium capitalize transition-colors ${
                filter === status
                  ? 'text-canyon-red border-b-2 border-canyon-red'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {status}
              {status !== 'all' && (
                <span className="ml-2 text-xs bg-gray-100 px-2 py-0.5 rounded-full">
                  {orders.filter(o => o.status === status).length}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-12 sm:p-16 text-center border border-gray-200">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No orders found</h3>
          <p className="text-gray-600">
            {filter === 'all' 
              ? 'No orders have been placed yet' 
              : `No ${filter} orders`}
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredOrders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8 hover:shadow-md transition-shadow"
            >
              {/* Order Header */}
              <div className="flex flex-wrap items-start justify-between mb-4 pb-4 border-b border-gray-200">
                <div className="flex-1 min-w-0 mr-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-bold text-rich-brown">
                      Order #{order._id.slice(-8).toUpperCase()}
                    </h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        order.status === 'completed'
                          ? 'bg-green-100 text-green-700'
                          : order.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {order.status.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{format(new Date(order.createdAt), 'MMM d, yyyy')}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>{order.customerName}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Mail className="w-4 h-4" />
                      <a
                        href={`mailto:${order.customerEmail}`}
                        className="text-canyon-red hover:text-canyon-terracotta"
                      >
                        {order.customerEmail}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-2xl font-bold text-rich-brown">
                    ${order.totalAmount.toFixed(2)}
                  </p>
                </div>
              </div>

              {/* Order Items */}
              <div className="space-y-2 mb-4">
                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded"
                  >
                    <div className="flex items-center space-x-3">
                      <Package className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="font-medium text-gray-900">{item.product.name}</p>
                        <p className="text-sm text-gray-600 capitalize">{item.product.type}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-900">
                        ${item.price.toFixed(2)} × {item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Actions */}
              {order.status === 'pending' && (
                <div className="flex space-x-3">
                  <button
                    onClick={() => updateOrderStatus(order._id, 'completed')}
                    className="flex-1 flex items-center justify-center space-x-2 bg-green-50 text-green-700 px-4 py-2 rounded-lg hover:bg-green-100 transition-colors"
                  >
                    <Check className="w-4 h-4" />
                    <span>Mark as Completed</span>
                  </button>
                  <button
                    onClick={() => updateOrderStatus(order._id, 'cancelled')}
                    className="flex-1 flex items-center justify-center space-x-2 bg-red-50 text-red-700 px-4 py-2 rounded-lg hover:bg-red-100 transition-colors"
                  >
                    <X className="w-4 h-4" />
                    <span>Cancel Order</span>
                  </button>
                </div>
              )}

              {order.status === 'completed' && (
                <div className="flex items-center space-x-2 text-green-600 bg-green-50 px-4 py-3 rounded-lg">
                  <Check className="w-5 h-5" />
                  <span className="font-medium">Order fulfilled</span>
                </div>
              )}

              {order.status === 'cancelled' && (
                <div className="flex items-center space-x-2 text-red-600 bg-red-50 px-4 py-3 rounded-lg">
                  <X className="w-5 h-5" />
                  <span className="font-medium">Order cancelled</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

