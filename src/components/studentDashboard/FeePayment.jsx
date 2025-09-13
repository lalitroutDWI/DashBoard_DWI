import React, { useState } from 'react';
import { 
  DollarSign, 
  CheckCircle,
  AlertTriangle,
  Download,
  Receipt,
  Bell,
  Calendar
} from 'lucide-react';

const SimplifiedFeePayment = () => {
  // Sample payment data
  const paymentHistory = [
    {
      id: 1,
      description: 'Semester 1 Tuition Fee',
      amount: 95000,
      paidDate: '2024-01-15',
      paymentMethod: 'Credit Card',
      transactionId: 'TXN001234567',
      status: 'completed',
      receiptNumber: 'RCP001234'
    },
    {
      id: 2,
      description: 'Library Fee',
      amount: 6500,
      paidDate: '2024-01-10',
      paymentMethod: 'UPI',
      transactionId: 'TXN001234568',
      status: 'completed',
      receiptNumber: 'RCP001235'
    },
    {
      id: 3,
      description: 'Development Fee',
      amount: 12000,
      paidDate: '2024-02-20',
      paymentMethod: 'Net Banking',
      transactionId: 'TXN001234570',
      status: 'completed',
      receiptNumber: 'RCP001237'
    }
  ];

  const pendingPayments = [
    {
      id: 1,
      description: 'Semester 2 Tuition Fee',
      amount: 95000,
      dueDate: '2024-06-20',
      status: 'pending',
      category: 'Tuition',
      daysOverdue: 0
    },
    {
      id: 2,
      description: 'Laboratory Fee - Chemistry',
      amount: 4000,
      dueDate: '2024-06-15',
      status: 'overdue',
      category: 'Laboratory',
      daysOverdue: 5,
      penalty: 200
    },
    {
      id: 3,
      description: 'Annual Sports Fee',
      amount: 5000,
      dueDate: '2024-06-25',
      status: 'pending',
      category: 'Sports',
      daysOverdue: 0
    }
  ];

  const getDaysUntilDue = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const downloadReceipt = (payment) => {
    // Simulate receipt download
    alert(`Downloading receipt for ${payment.description} - Receipt #${payment.receiptNumber}`);
  };

  const OverviewCard = ({ title, amount, description, icon: Icon, color }) => (
    <div className="bg-white rounded-lg p-6 shadow-sm border">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
      <h3 className="text-2xl font-bold text-gray-800 mb-1">₹{amount.toLocaleString('en-IN')}</h3>
      <p className="text-sm font-medium text-gray-700 mb-1">{title}</p>
      {description && <p className="text-xs text-gray-500">{description}</p>}
    </div>
  );

  // Calculate totals
  const totalPaid = paymentHistory.reduce((sum, p) => sum + p.amount, 0);
  const totalDue = pendingPayments.reduce((sum, p) => sum + p.amount, 0);
  const totalPenalties = pendingPayments.reduce((sum, p) => sum + (p.penalty || 0), 0);
  const overduePayments = pendingPayments.filter(p => p.status === 'overdue');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Fee Overview & Notifications</h2>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <OverviewCard 
          title="Total Amount Due"
          amount={totalDue}
          description="Pending payments"
          icon={DollarSign}
          color="bg-red-100 text-red-600"
        />
        <OverviewCard 
          title="Total Amount Paid"
          amount={totalPaid}
          description="This academic year"
          icon={CheckCircle}
          color="bg-green-100 text-green-600"
        />
        <OverviewCard 
          title="Penalty Amount"
          amount={totalPenalties}
          description="Late payment fees"
          icon={AlertTriangle}
          color="bg-orange-100 text-orange-600"
        />
        <OverviewCard 
          title="Overdue Payments"
          amount={overduePayments.length}
          description="Immediate attention required"
          icon={Bell}
          color="bg-red-100 text-red-600"
        />
      </div>

      {/* Payment Deadline Notifications */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center">
            <Bell className="w-5 h-5 mr-2 text-blue-600" />
            Payment Deadline Notifications
          </h3>
        </div>
        
        <div className="p-6 space-y-4">
          {/* Overdue Payment Alert */}
          {overduePayments.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-6 h-6 text-red-600 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-medium text-red-800 mb-2">Overdue Payment Alert</h4>
                  <p className="text-sm text-red-700 mb-3">
                    You have {overduePayments.length} overdue payment(s) with total penalties of ₹{totalPenalties.toLocaleString('en-IN')}.
                  </p>
                  <div className="space-y-2">
                    {overduePayments.map((payment) => (
                      <div key={payment.id} className="bg-white rounded p-3 border border-red-200">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-red-800">{payment.description}</p>
                            <p className="text-sm text-red-600">
                              {payment.daysOverdue} days overdue • Penalty: ₹{payment.penalty}
                            </p>
                          </div>
                          <span className="text-lg font-bold text-red-800">
                            ₹{payment.amount.toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Upcoming Due Dates */}
          <div className="space-y-3">
            <h4 className="font-medium text-gray-700 flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              Upcoming Due Dates
            </h4>
            {pendingPayments.filter(p => p.status !== 'overdue').map((payment) => {
              const daysUntil = getDaysUntilDue(payment.dueDate);
              const isUrgent = daysUntil <= 7;
              
              return (
                <div key={payment.id} className={`p-4 rounded-lg border ${
                  isUrgent ? 'bg-orange-50 border-orange-200' : 'bg-blue-50 border-blue-200'
                }`}>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-gray-800">{payment.description}</p>
                      <p className={`text-sm font-medium ${
                        isUrgent ? 'text-orange-600' : 'text-blue-600'
                      }`}>
                        Due: {payment.dueDate} ({daysUntil === 0 ? 'Due today' : 
                         daysUntil === 1 ? '1 day remaining' : 
                         `${daysUntil} days remaining`})
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-bold text-gray-800">
                        ₹{payment.amount.toLocaleString('en-IN')}
                      </span>
                      {isUrgent && (
                        <div className="flex items-center text-orange-600 text-xs mt-1">
                          <AlertTriangle className="w-3 h-3 mr-1" />
                          Urgent
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Payment History with Receipt Downloads */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center">
            <Receipt className="w-5 h-5 mr-2 text-green-600" />
            Payment History & Receipts
          </h3>
        </div>
        
        <div className="p-6">
          {/* Summary */}
          <div className="mb-6 p-4 bg-green-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Total Paid This Year</span>
              <span className="text-lg font-bold text-green-600">
                ₹{totalPaid.toLocaleString('en-IN')}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-600 h-2 rounded-full" 
                style={{ width: `${(totalPaid / (totalPaid + totalDue)) * 100}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {((totalPaid / (totalPaid + totalDue)) * 100).toFixed(1)}% of total fees paid
            </p>
          </div>

          {/* Payment History List */}
          <div className="space-y-4">
            {paymentHistory.map((payment) => (
              <div key={payment.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800 mb-1">{payment.description}</h4>
                    <p className="text-sm text-gray-600">Paid: {payment.paidDate}</p>
                    <p className="text-sm text-gray-600">Method: {payment.paymentMethod}</p>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-600 mb-2">
                      ₹{payment.amount.toLocaleString('en-IN')}
                    </div>
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium flex items-center">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Completed
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                  <div className="text-xs text-gray-500">
                    <div>Transaction ID: {payment.transactionId}</div>
                    <div>Receipt: {payment.receiptNumber}</div>
                  </div>
                  
                  <button 
                    onClick={() => downloadReceipt(payment)}
                    className="flex items-center space-x-2 bg-blue-600 text-white px-3 py-2 rounded-md text-sm hover:bg-blue-700 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Receipt</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimplifiedFeePayment;