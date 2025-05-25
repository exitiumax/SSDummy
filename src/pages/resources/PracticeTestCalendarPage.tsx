import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Clock, MapPin, X, CheckCircle } from 'lucide-react';

// Service options for checkout
const SERVICE_OPTIONS = [
  { id: 'test-only', label: 'Practice Test - $99', amount: 9900 },
  { id: 'test-review', label: 'Practice Test + 1 on 1 Review - $260', amount: 26000 }
];

const PracticeTestCalendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [hoveredEvent, setHoveredEvent] = useState<any>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoverTimeout, setHoverTimeout] = useState<any>(null);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<'service' | 'payment' | 'confirmation'>('service');
  const [serviceSelection, setServiceSelection] = useState(SERVICE_OPTIONS[0].id);
  const [registrationData, setRegistrationData] = useState({ firstName: '', lastName: '', email: '', studentName: '', studentSchool: '', studentGrade: '' });
  const [cardDetails, setCardDetails] = useState({ cardNumber: '', expiryDate: '', cvv: '', billingZip: '' });

  const practiceTests = [
    { id: 1, title: 'Practice SAT', date: '2025-05-25', time: '9:00 AM - 12:30 PM', duration: '3.5 hours', location: 'Room 101', price: 45 },
    { id: 2, title: 'Practice ACT', date: '2025-05-31', time: '10:00 AM - 1:00 PM', duration: '3 hours', location: 'Room 102', price: 40 },
    { id: 3, title: 'Practice SAT', date: '2025-06-07', time: '9:00 AM - 12:30 PM', duration: '3.5 hours', location: 'Room 101', price: 45 }
  ];

  const getDaysInMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const getFirstDayOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  const formatDate = (date: Date) => date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const getEventsForDate = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth()+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
    return practiceTests.filter(test => test.date === dateStr);
  };

  const navigateMonth = (dir: number) => setCurrentDate(d => {
    const nd = new Date(d);
    nd.setMonth(d.getMonth()+dir);
    return nd;
  });

  const handleEventHover = (event: any, e: React.MouseEvent) => {
    if (hoverTimeout) clearTimeout(hoverTimeout);
    setHoveredEvent(event);
    setMousePosition({ x: e.clientX, y: e.clientY });
  };
  const handleEventLeave = () => {
    const timeout = setTimeout(() => setHoveredEvent(null), 800);
    setHoverTimeout(timeout);
  };
  const handleTooltipEnter = () => hoverTimeout && clearTimeout(hoverTimeout);
  const handleTooltipLeave = () => setHoveredEvent(null);

  const handleRegisterClick = (event: any) => {
    setSelectedEvent(event);
    setShowCheckout(true);
    setCheckoutStep('service');
  };
  const closeModal = () => {
    setShowCheckout(false);
    setSelectedEvent(null);
    setCheckoutStep('service');
    setRegistrationData({ firstName: '', lastName: '', email: '', studentName: '', studentSchool: '', studentGrade: '' });
    setCardDetails({ cardNumber: '', expiryDate: '', cvv: '', billingZip: '' });
  };

  const handleServiceNext = () => setCheckoutStep('payment');
  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Submit registration and payment
    setTimeout(() => setCheckoutStep('confirmation'), 500);
  };

  const computeTooltipStyle = () => {
    const width = 300;
    const height = 180;
    let left = mousePosition.x + 10;
    let top = mousePosition.y - 100;
    const maxX = window.innerWidth - width - 10;
    const maxY = window.innerHeight - height - 10;
    if (left > maxX) left = maxX;
    if (top < 10) top = 10;
    if (top > maxY) top = maxY;
    return { left, top };
  };

  const renderCalendarDays = () => {
    const days: JSX.Element[] = [];
    const total = getDaysInMonth(currentDate);
    const first = getFirstDayOfMonth(currentDate);

    for (let i = 0; i < first; i++) days.push(<div key={`e${i}`} className="h-32 border"></div>);

    for (let day = 1; day <= total; day++) {
      const events = getEventsForDate(day);
      const isToday = new Date().toDateString() === new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString();

      days.push(
        <div key={day} className={`h-32 border p-2 ${isToday ? 'bg-blue-50' : ''}`}> 
          <div className={`text-sm font-medium mb-1 ${isToday ? 'text-blue-600' : 'text-gray-700'}`}>{day}</div>
          {events.map(ev => {
            const isACT = ev.title.includes('ACT');
            const bgColor = isACT ? 'bg-blue-100 text-blue-800 hover:bg-blue-200' : 'bg-green-100 text-green-800 hover:bg-green-200';
            return (
              <div
                key={ev.id}
                className={`text-xs p-1 mb-1 rounded cursor-pointer transition-colors ${bgColor}`}
                onMouseEnter={e => handleEventHover(ev, e)}
                onMouseLeave={handleEventLeave}
                onClick={() => handleRegisterClick(ev)}
              >
                <div className="font-medium">{ev.title}</div>
                <div className="opacity-75">{ev.time.split(' - ')[0]}</div>
              </div>
            );
          })}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white">
      <h1 className="text-3xl font-bold mb-4">Practice Test Calendar</h1>
      <div className="flex justify-between items-center mb-4">
        <button onClick={() => navigateMonth(-1)} className="p-2 border rounded"><ChevronLeft /></button>
        <h2 className="text-2xl font-semibold">{formatDate(currentDate)}</h2>
        <button onClick={() => navigateMonth(1)} className="p-2 border rounded"><ChevronRight /></button>
      </div>

      <div className="grid grid-cols-7 bg-gray-50 text-center font-medium py-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => <div key={d}>{d}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-1">{renderCalendarDays()}</div>

      {hoveredEvent && (
        <div
          className="fixed z-50 bg-white rounded-lg shadow-xl border p-4 max-w-xs text-sm"
          style={computeTooltipStyle()}
          onMouseEnter={handleTooltipEnter}
          onMouseLeave={handleTooltipLeave}
        >
          <h3 className="font-semibold text-lg mb-2">{hoveredEvent.title}</h3>
          <div className="space-y-1">
            <div className="flex items-center gap-1"><Clock className="w-4 h-4" /><span>{hoveredEvent.time} ({hoveredEvent.duration})</span></div>
            <div className="flex items-center gap-1"><MapPin className="w-4 h-4" /><span>{hoveredEvent.location}</span></div>
            <div className="font-medium text-green-600">${hoveredEvent.price}</div>
          </div>
          <button
            className="w-full mt-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={() => handleRegisterClick(hoveredEvent)}
          >
            Register Now
          </button>
        </div>
      )}

      {showCheckout && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-start justify-center overflow-auto pt-20"
          onClick={closeModal}
        >
          <div
            onClick={e => e.stopPropagation()}
            className="bg-white rounded-lg max-w-md w-full p-6 relative max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={closeModal}
              className="absolute top-3 right-3"
              aria-label="Close"
            >
              <X />
            </button>

            {checkoutStep === 'service' && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Select Service for {selectedEvent.title}</h3>
                <div className="space-y-2 mb-4">
                  {SERVICE_OPTIONS.map(opt => (
                    <label key={opt.id} className="flex items-center">
                      <input
                        type="radio"
                        name="service"
                        value={opt.id}
                        checked={serviceSelection === opt.id}
                        onChange={() => setServiceSelection(opt.id)}
                        className="mr-2"
                      />
                      {opt.label}
                    </label>
                  ))}
                </div>
                <button
                  onClick={handleServiceNext}
                  className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Continue to Registration & Payment
                </button>
              </div>
            )}

            {checkoutStep === 'payment' && (
              <form onSubmit={handlePaymentSubmit} className="space-y-4">
                <h3 className="text-lg font-semibold mb-2">Registration & Payment</h3>
                {/* Registration fields... */}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-sm">First Name</label>
                    <input
                      type="text"
                      value={registrationData.firstName}
                      onChange={e => setRegistrationData({ ...registrationData, firstName: e.target.value })}
                      required
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm">Last Name</label>
                    <input
                      type="text"
                      value={registrationData.lastName}
                      onChange={e => setRegistrationData({ ...registrationData, lastName: e.target.value })}
                      required
                      className="w-full p-2 border rounded"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm">Email</label>
                  <input
                    type="email"
                    value={registrationData.email}
                    onChange={e => setRegistrationData({ ...registrationData, email: e.target.value })}
                    required
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm">Student Name</label>
                  <input
                    type="text"
                    value={registrationData.studentName}
                    onChange={e => setRegistrationData({ ...registrationData, studentName: e.target.value })}
                    required
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm">Student School</label>
                  <input
                    type="text"
                    value={registrationData.studentSchool}
                    onChange={e => setRegistrationData({ ...registrationData, studentSchool: e.target.value })}
                    required
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm">Student Grade Level</label>
                  <select
                    value={registrationData.studentGrade}
                    onChange={e => setRegistrationData({ ...registrationData, studentGrade: e.target.value })}
                    required
                    className="w-full p-2 border rounded"
                  >
                    <option value="">Select Grade</option>
                    <option value="9">9th Grade</option>
                    <option value="10">10th Grade</option>
                    <option value="11">11th Grade</option>
                    <option value="12">12th Grade</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm">Card Number</label>
                  <input
                    type="text"
                    value={cardDetails.cardNumber}
                    onChange={e => setCardDetails({ ...cardDetails, cardNumber: e.target.value })}
                    required
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-sm">Expiration Date</label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      value={cardDetails.expiryDate}
                      onChange={e => setCardDetails({ ...cardDetails, expiryDate: e.target.value })}
                      required
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm">CVV</label>
                    <input
                      type="text"
                      value={cardDetails.cvv}
                      onChange={e => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                      required
                      className="w-full p-2 border rounded"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm">Billing ZIP</label>
                  <input
                    type="text"
                    value={cardDetails.billingZip}
                    onChange={e => setCardDetails({ ...cardDetails, billingZip: e.target.value })}
                    required
                    className="w-full p-2 border rounded"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Check Out
                </button>
              </form>
            )}

            {checkoutStep === 'confirmation' && (
              <div className="text-center">
                <CheckCircle className="mx-auto text-green-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Registration & Payment Confirmed!</h3>
                <p>Your registration for {selectedEvent.title} is confirmed.</p>
                <button
                  onClick={closeModal}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PracticeTestCalendar;