// Korean Public Holidays Data (2024-2027)
// Default holidays (fallback if localStorage is empty)
const defaultHolidays = [
    { date: '2024-01-01', name: '신정' },
    { date: '2024-02-09', name: '설날 연휴' },
    { date: '2024-02-10', name: '설날' },
    { date: '2024-02-11', name: '설날 연휴' },
    { date: '2024-02-12', name: '대체공휴일' },
    { date: '2024-03-01', name: '삼일절' },
    { date: '2024-04-10', name: '국회의원 선거일' },
    { date: '2024-05-05', name: '어린이날' },
    { date: '2024-05-06', name: '대체공휴일' },
    { date: '2024-05-15', name: '부처님 오신 날' },
    { date: '2024-06-06', name: '현충일' },
    { date: '2024-08-15', name: '광복절' },
    { date: '2024-09-16', name: '추석 연휴' },
    { date: '2024-09-17', name: '추석' },
    { date: '2024-09-18', name: '추석 연휴' },
    { date: '2024-10-03', name: '개천절' },
    { date: '2024-10-09', name: '한글날' },
    { date: '2024-12-25', name: '크리스마스' },
    { date: '2025-01-01', name: '신정' },
    { date: '2025-01-28', name: '설날 연휴' },
    { date: '2025-01-29', name: '설날' },
    { date: '2025-01-30', name: '설날 연휴' },
    { date: '2025-03-01', name: '삼일절' },
    { date: '2025-03-03', name: '대체공휴일' },
    { date: '2025-05-05', name: '어린이날' },
    { date: '2025-05-06', name: '대체공휴일' },
    { date: '2025-05-15', name: '부처님 오신 날' },
    { date: '2025-06-06', name: '현충일' },
    { date: '2025-08-15', name: '광복절' },
    { date: '2025-10-03', name: '개천절' },
    { date: '2025-10-05', name: '추석 연휴' },
    { date: '2025-10-06', name: '추석' },
    { date: '2025-10-07', name: '추석 연휴' },
    { date: '2025-10-08', name: '대체공휴일' },
    { date: '2025-10-09', name: '한글날' },
    { date: '2025-12-25', name: '크리스마스' },
    { date: '2026-01-01', name: '신정' },
    { date: '2026-02-16', name: '설날 연휴' },
    { date: '2026-02-17', name: '설날' },
    { date: '2026-02-18', name: '설날 연휴' },
    { date: '2026-03-01', name: '삼일절' },
    { date: '2026-05-05', name: '어린이날' },
    { date: '2026-05-25', name: '부처님 오신 날' },
    { date: '2026-06-06', name: '현충일' },
    { date: '2026-08-15', name: '광복절' },
    { date: '2026-09-24', name: '추석 연휴' },
    { date: '2026-09-25', name: '추석' },
    { date: '2026-09-26', name: '추석 연휴' },
    { date: '2026-10-03', name: '개천절' },
    { date: '2026-10-05', name: '대체공휴일' },
    { date: '2026-10-09', name: '한글날' },
    { date: '2026-12-25', name: '크리스마스' },
    { date: '2027-01-01', name: '신정' },
    { date: '2027-02-06', name: '설날 연휴' },
    { date: '2027-02-07', name: '설날' },
    { date: '2027-02-08', name: '설날 연휴' },
    { date: '2027-03-01', name: '삼일절' },
    { date: '2027-05-05', name: '어린이날' },
    { date: '2027-05-13', name: '부처님 오신 날' },
    { date: '2027-06-06', name: '현충일' },
    { date: '2027-08-15', name: '광복절' },
    { date: '2027-09-14', name: '추석 연휴' },
    { date: '2027-09-15', name: '추석' },
    { date: '2027-09-16', name: '추석 연휴' },
    { date: '2027-10-03', name: '개천절' },
    { date: '2027-10-09', name: '한글날' },
    { date: '2027-12-25', name: '크리스마스' }
];

// Load holidays from localStorage or use default
function loadHolidays() {
    const stored = localStorage.getItem('koreanHolidays');
    if (stored) {
        try {
            return JSON.parse(stored);
        } catch (e) {
            console.error('Failed to parse stored holidays:', e);
            return defaultHolidays;
        }
    }
    return defaultHolidays;
}

// Save holidays to localStorage
function saveHolidaysData(holidays) {
    localStorage.setItem('koreanHolidays', JSON.stringify(holidays));
}

// Initialize holidays on first run
function initializeHolidays() {
    const stored = localStorage.getItem('koreanHolidays');
    if (!stored) {
        // First time - save default holidays
        saveHolidaysData(defaultHolidays);
    }
    return loadHolidays();
}

// Global holidays array
let koreanHolidays = [];

// Global state
let currentYear = new Date().getFullYear();
let currentMonth = new Date().getMonth();
const today = new Date();
today.setHours(0, 0, 0, 0);  // 시간 부분 제거하여 날짜만 비교

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    koreanHolidays = initializeHolidays();
    renderCalendar(currentYear, currentMonth);
    setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
    document.getElementById('prevMonth').addEventListener('click', () => navigateMonth(-1));
    document.getElementById('nextMonth').addEventListener('click', () => navigateMonth(1));
    document.getElementById('resetMonth').addEventListener('click', resetToCurrentMonth);
    document.getElementById('importData').addEventListener('click', openImportModal);
    document.getElementById('clearData').addEventListener('click', clearAllData);

    // Import Modal event listeners
    const importModal = document.getElementById('importModal');
    importModal.querySelector('.close').addEventListener('click', closeImportModal);
    document.getElementById('cancelImport').addEventListener('click', closeImportModal);
    document.getElementById('parseData').addEventListener('click', parseAndImportData);

    // Holiday Management event listeners
    document.getElementById('manageHolidays').addEventListener('click', openHolidayModal);
    const holidayModal = document.getElementById('holidayModal');
    holidayModal.querySelector('.close').addEventListener('click', closeHolidayModal);
    document.getElementById('saveHolidays').addEventListener('click', saveHolidaysFromTextarea);
    document.getElementById('exportHolidays').addEventListener('click', exportHolidaysToFile);
    document.getElementById('importHolidays').addEventListener('click', importHolidaysFromFile);
    document.getElementById('cancelHoliday').addEventListener('click', closeHolidayModal);
    document.getElementById('holidayFileInput').addEventListener('change', handleHolidayFileSelect);

    // Close modals when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === importModal) {
            closeImportModal();
        }
        if (e.target === holidayModal) {
            closeHolidayModal();
        }
    });

    // Handle window resize to update layout (desktop <-> mobile)
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            renderCalendar(currentYear, currentMonth);
        }, 250);
    });
}

// Navigate months
function navigateMonth(offset) {
    currentMonth += offset;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    } else if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    renderCalendar(currentYear, currentMonth);
}

// Reset to current month
function resetToCurrentMonth() {
    currentYear = today.getFullYear();
    currentMonth = today.getMonth();
    renderCalendar(currentYear, currentMonth);
}

// Clear all data
function clearAllData() {
    if (confirm('모든 근무시간 데이터를 삭제하시겠습니까?')) {
        localStorage.clear();
        renderCalendar(currentYear, currentMonth);
    }
}

// Open import modal
function openImportModal() {
    document.getElementById('importModal').style.display = 'block';
    document.getElementById('importTextarea').value = '';
    document.getElementById('importTextarea').focus();
}

// Close import modal
function closeImportModal() {
    document.getElementById('importModal').style.display = 'none';
}

// Parse and import data from intranet
function parseAndImportData() {
    const textarea = document.getElementById('importTextarea');
    const text = textarea.value;

    if (!text.trim()) {
        alert('데이터를 입력해주세요.');
        return;
    }

    try {
        const lines = text.split('\n');
        const dateData = {}; // { "2025-12-22": { work: 6.98, break: 0.55 } }
        let currentDate = null;

        for (let line of lines) {
            line = line.trim();
            if (!line) continue;

            // Skip lines that are part of modification history
            if (line.startsWith('*') ||
                line.startsWith('사유:') ||
                line.includes('시간 수정') ||
                line.includes('시간 추가') ||
                line.includes('시작 시간:') ||
                line.includes('종료 시간:') ||
                line === '-') {
                continue;
            }

            // Split by tabs or multiple spaces
            const parts = line.split(/\t+|\s{2,}/);

            // Check if this line has a date in the FIRST field (exact match YYYY-MM-DD)
            if (parts[0] && /^\d{4}-\d{2}-\d{2}$/.test(parts[0])) {
                currentDate = parts[0];
                if (!dateData[currentDate]) {
                    dateData[currentDate] = { work: 0, break: 0 };
                }
            }

            if (!currentDate) continue;

            // Look for "업무" or "휴게"
            const workIndex = parts.findIndex(p => p === '업무');
            const breakIndex = parts.findIndex(p => p === '휴게');

            let timeIndex = -1;
            let isWork = false;

            if (workIndex !== -1) {
                timeIndex = workIndex;
                isWork = true;
            } else if (breakIndex !== -1) {
                timeIndex = breakIndex;
                isWork = false;
            }

            if (timeIndex === -1) continue;

            // Get the time part (next element after "업무" or "휴게")
            const timePart = parts[timeIndex + 1];
            if (!timePart) continue;

            // Extract hours from parentheses like "09:34 ~ 16:32 (06:59)"
            const timeMatch = timePart.match(/\((\d{2}):(\d{2})\)/);
            if (!timeMatch) continue;

            const hours = parseInt(timeMatch[1]);
            const minutes = parseInt(timeMatch[2]);
            const totalHours = hours + minutes / 60;

            // Accumulate work or break time
            if (isWork) {
                dateData[currentDate].work += totalHours;
            } else {
                dateData[currentDate].break += totalHours;
            }
        }

        // Debug: Log parsed data
        console.log('파싱된 데이터:', dateData);

        // Apply the data: actual work hours = work hours - break hours
        let imported = 0;
        const importedDates = new Set();

        for (let dateStr in dateData) {
            const data = dateData[dateStr];
            const actualHours = data.work - data.break;

            if (actualHours > 0) {
                const [year, month, day] = dateStr.split('-').map(Number);
                const date = new Date(year, month - 1, day);

                // Save the hours and clear vacation flag (actual work data exists)
                saveHours(date, roundHours(actualHours), false, true);
                importedDates.add(dateStr);
                imported++;
            }
        }

        // Find missing dates (vacation days)
        // Get the earliest date from imported data
        const dates = Array.from(importedDates).sort();
        if (dates.length > 0) {
            const firstDateStr = dates[0];
            const [firstYear, firstMonth, firstDay] = firstDateStr.split('-').map(Number);
            const startDate = new Date(firstYear, firstMonth - 1, firstDay);
            const endDate = new Date(today); // today is already set to 00:00:00

            let vacationCount = 0;

            // Iterate through all dates from start to today
            for (let d = new Date(startDate); d < endDate; d.setDate(d.getDate() + 1)) {
                const dateStr = formatDate(d);

                // Skip if data exists for this date
                if (importedDates.has(dateStr)) continue;

                // Skip weekends and holidays
                if (isWeekend(d) || isHoliday(d)) continue;

                // This is a missing weekday - mark as vacation
                const monthKey = getMonthKey(d.getFullYear(), d.getMonth());
                let monthData = JSON.parse(localStorage.getItem(monthKey)) || {};

                if (!monthData[dateStr]) {
                    monthData[dateStr] = { hours: 8, manual: false, vacation: false };
                }

                monthData[dateStr].vacation = true;
                localStorage.setItem(monthKey, JSON.stringify(monthData));
                vacationCount++;
            }

            closeImportModal();
            renderCalendar(currentYear, currentMonth);
            alert(`${imported}개의 근무시간 데이터를 가져왔습니다.\n${vacationCount}개의 날짜를 휴가로 설정했습니다.`);
        } else {
            closeImportModal();
            alert('업무 시간 데이터를 찾을 수 없습니다.');
        }
    } catch (error) {
        console.error('파싱 오류:', error);
        alert('데이터 파싱 중 오류가 발생했습니다. 데이터 형식을 확인해주세요.');
    }
}

// ===== Holiday Management Functions =====

// Open holiday management modal
function openHolidayModal() {
    const modal = document.getElementById('holidayModal');
    const textarea = document.getElementById('holidayTextarea');

    // Convert current holidays to text format
    const text = koreanHolidays
        .map(h => `${h.date},${h.name}`)
        .join('\n');
    textarea.value = text;

    modal.style.display = 'block';
}

// Save holidays from textarea
function saveHolidaysFromTextarea() {
    const textarea = document.getElementById('holidayTextarea');
    const lines = textarea.value.split('\n').filter(line => line.trim());

    const holidays = [];
    for (const line of lines) {
        const parts = line.split(',');
        if (parts.length >= 2) {
            const date = parts[0].trim();
            const name = parts.slice(1).join(',').trim(); // Handle names with commas
            if (date && name && /^\d{4}-\d{2}-\d{2}$/.test(date)) {
                holidays.push({ date, name });
            }
        }
    }

    // Sort by date
    holidays.sort((a, b) => a.date.localeCompare(b.date));

    koreanHolidays = holidays;
    saveHolidaysData(holidays);

    closeHolidayModal();
    renderCalendar(currentYear, currentMonth);

    alert(`${holidays.length}개의 공휴일이 저장되었습니다.`);
}

// Export holidays to txt file
function exportHolidaysToFile() {
    const text = koreanHolidays
        .map(h => `${h.date},${h.name}`)
        .join('\n');

    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'holidays.txt';
    a.click();
    URL.revokeObjectURL(url);
}

// Import holidays from txt file
function importHolidaysFromFile() {
    const input = document.getElementById('holidayFileInput');
    input.click();
}

// Handle file selection
function handleHolidayFileSelect(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        const text = e.target.result;
        document.getElementById('holidayTextarea').value = text;
    };
    reader.readAsText(file, 'UTF-8');

    // Reset input
    event.target.value = '';
}

// Close holiday modal
function closeHolidayModal() {
    document.getElementById('holidayModal').style.display = 'none';
}

// Check if date is weekend
function isWeekend(date) {
    const day = date.getDay();
    return day === 0 || day === 6;
}

// Check if date is holiday
function isHoliday(date) {
    const dateStr = formatDate(date);
    const holiday = koreanHolidays.find(h => h.date === dateStr);
    return holiday ? holiday.name : null;
}

// Format date to YYYY-MM-DD
function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// Get month key for localStorage
function getMonthKey(year, month) {
    return `${year}-${String(month + 1).padStart(2, '0')}`;
}

// Save hours to localStorage
function saveHours(date, hours, isManual = false, clearVacation = false) {
    const dateStr = formatDate(date);
    const monthKey = getMonthKey(date.getFullYear(), date.getMonth());

    let monthData = JSON.parse(localStorage.getItem(monthKey)) || {};

    // Store as object with hours and manual flag
    if (!monthData[dateStr]) {
        monthData[dateStr] = {};
    }

    // Preserve existing flags
    const existingManual = monthData[dateStr].manual || false;
    const existingVacation = monthData[dateStr].vacation || false;

    monthData[dateStr] = {
        hours: hours,
        manual: isManual || existingManual,
        vacation: clearVacation ? false : existingVacation  // Clear vacation if explicitly requested
    };

    localStorage.setItem(monthKey, JSON.stringify(monthData));
}

// Load hours from localStorage
function loadHours(date) {
    const dateStr = formatDate(date);
    const monthKey = getMonthKey(date.getFullYear(), date.getMonth());

    const monthData = JSON.parse(localStorage.getItem(monthKey)) || {};
    const dayData = monthData[dateStr];

    // Support both old format (number) and new format (object)
    if (dayData === undefined) return 8;
    if (typeof dayData === 'number') return dayData;
    return dayData.hours !== undefined ? dayData.hours : 8;
}

// Check if a day was manually modified
function isManuallyModified(date) {
    const dateStr = formatDate(date);
    const monthKey = getMonthKey(date.getFullYear(), date.getMonth());

    const monthData = JSON.parse(localStorage.getItem(monthKey)) || {};
    const dayData = monthData[dateStr];

    if (!dayData) return false;
    if (typeof dayData === 'number') return false; // Old format, not marked as manual
    return dayData.manual === true;
}

// Check if a day is marked as vacation
function isVacation(date) {
    const dateStr = formatDate(date);
    const monthKey = getMonthKey(date.getFullYear(), date.getMonth());

    const monthData = JSON.parse(localStorage.getItem(monthKey)) || {};
    const dayData = monthData[dateStr];

    if (!dayData) return false;
    return dayData.vacation === true;
}

// Toggle vacation status for a day
function toggleVacation(date) {
    const dateStr = formatDate(date);
    const monthKey = getMonthKey(date.getFullYear(), date.getMonth());

    let monthData = JSON.parse(localStorage.getItem(monthKey)) || {};

    if (!monthData[dateStr]) {
        monthData[dateStr] = { hours: 8, manual: false, vacation: false };
    }

    // Toggle vacation status
    monthData[dateStr].vacation = !monthData[dateStr].vacation;

    localStorage.setItem(monthKey, JSON.stringify(monthData));

    // Re-render calendar and update calculations
    renderCalendar(currentYear, currentMonth);
}

// Add lock icon to a day
function addLockIcon(date) {
    const dateStr = formatDate(date);

    // Find the day cell using data-date attribute
    const cell = document.querySelector(`.day-cell[data-date="${dateStr}"]`);
    if (!cell) return;

    const container = cell.querySelector('.checkbox-lock-container');
    if (!container) return;

    // Remove existing lock icon if any
    const existingLock = container.querySelector('.lock-icon');
    if (existingLock) existingLock.remove();

    // Add lock icon
    const lockIcon = document.createElement('span');
    lockIcon.className = 'lock-icon locked';
    lockIcon.title = '클릭하여 잠금 해제 (자동 조정 허용)';
    lockIcon.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleManualLock(date);
    });
    container.appendChild(lockIcon);
}

// Remove lock icon from a day
function removeLockIcon(date) {
    const dateStr = formatDate(date);

    // Find the day cell using data-date attribute
    const cell = document.querySelector(`.day-cell[data-date="${dateStr}"]`);
    if (!cell) return;

    const container = cell.querySelector('.checkbox-lock-container');
    if (!container) return;

    const lockIcon = container.querySelector('.lock-icon');
    if (lockIcon) lockIcon.remove();
}

// Toggle manual lock for a day
function toggleManualLock(date) {
    const dateStr = formatDate(date);
    const monthKey = getMonthKey(date.getFullYear(), date.getMonth());

    let monthData = JSON.parse(localStorage.getItem(monthKey)) || {};
    const dayData = monthData[dateStr];

    if (!dayData) return;

    // Toggle the manual flag
    const currentManual = dayData.manual || false;
    dayData.manual = !currentManual;
    monthData[dateStr] = dayData;

    localStorage.setItem(monthKey, JSON.stringify(monthData));

    // Update lock icon
    if (dayData.manual) {
        addLockIcon(date);
    } else {
        removeLockIcon(date);
        // If unlocked, trigger auto-adjustment
        autoAdjustFutureWeekdays();
    }

    updateSummary();
}

// Calculate totals for the month
function calculateTotals(year, month) {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    let requiredHours = 0;
    let actualHours = 0;
    let hoursUpToToday = 0;  // 현재까지 근무 시간
    let totalWeekdays = 0;
    let passedWeekdays = 0;

    for (let d = new Date(firstDay); d <= lastDay; d.setDate(d.getDate() + 1)) {
        // 주말, 공휴일, 휴가일 제외
        if (!isWeekend(d) && !isHoliday(d) && !isVacation(d)) {
            totalWeekdays++;
            requiredHours += 8;
            actualHours += loadHours(d);

            // 어제까지만 지나간 평일로 계산 (오늘은 남은 평일에 포함)
            if (d < today) {
                passedWeekdays++;
            }

            // 어제까지만 집계 (오늘은 제외)
            if (d < today) {
                hoursUpToToday += loadHours(d);
            }
        }
    }

    const deficit = actualHours - requiredHours;
    const remainingWeekdays = totalWeekdays - passedWeekdays;
    // 남은 필요 시간 = 총 필요시간 - 어제까지 일한 시간 (미래 계획 시간 제외)
    const remainingHoursNeeded = requiredHours - hoursUpToToday;
    const averageNeeded = remainingWeekdays > 0 ? remainingHoursNeeded / remainingWeekdays : 0;

    return {
        requiredHours,
        actualHours,
        hoursUpToToday,  // 추가
        deficit,
        averageNeeded: Math.max(0, averageNeeded),
        remainingWeekdays
    };
}

// Update summary panel
function updateSummary() {
    const totals = calculateTotals(currentYear, currentMonth);

    document.getElementById('requiredHours').textContent = formatHoursMinutes(totals.requiredHours);
    document.getElementById('actualHours').textContent = formatHoursMinutes(totals.actualHours);
    document.getElementById('hoursUpToNow').textContent = formatHoursMinutes(totals.hoursUpToToday);

    const deficitEl = document.getElementById('deficit');
    const deficitFormatted = formatHoursMinutes(Math.abs(totals.deficit));
    deficitEl.textContent = `${totals.deficit >= 0 ? '+' : '-'}${deficitFormatted}`;
    deficitEl.className = 'summary-value ' + (totals.deficit >= 0 ? 'positive' : 'negative');

    const averageEl = document.getElementById('averageNeeded');
    if (totals.remainingWeekdays > 0) {
        averageEl.textContent = `${formatHoursMinutes(totals.averageNeeded)}/일`;
        averageEl.className = 'summary-value';
    } else {
        averageEl.textContent = '남은 평일 없음';
        averageEl.className = 'summary-value';
    }
}

// Convert decimal hours to "Xh Ym" format
function formatHoursMinutes(decimalHours) {
    const totalMinutes = Math.round(decimalHours * 60);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    if (minutes === 0) {
        return `${hours}h`;
    }
    return `${hours}h ${minutes}m`;
}

// Round hours to nearest 1 minute (1/60 hour)
function roundHours(hours) {
    return Math.round(hours * 60) / 60; // Round to nearest 1/60 hour (1 minute)
}

// Auto-adjust future weekdays based on deficit
function autoAdjustFutureWeekdays() {
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);

    // Calculate total required hours and separate future days
    let requiredHoursTotal = 0;
    let actualHoursUpToToday = 0;
    let futureWeekdaysAuto = []; // Future days not manually modified (to be auto-adjusted)
    let futureWeekdaysManual = 0; // Total hours in manually modified future days

    for (let d = new Date(firstDay); d <= lastDay; d.setDate(d.getDate() + 1)) {
        // 주말, 공휴일, 휴가일 제외
        if (!isWeekend(d) && !isHoliday(d) && !isVacation(d)) {
            requiredHoursTotal += 8;

            if (d <= today) {
                // Count actual hours up to and including today
                actualHoursUpToToday += loadHours(d);
            } else {
                // For future days, separate auto-adjustable from manually modified
                const hours = loadHours(d);
                if (isManuallyModified(d)) {
                    // This day was manually modified, count its hours but don't auto-adjust
                    futureWeekdaysManual += hours;
                } else {
                    // This day can be auto-adjusted
                    futureWeekdaysAuto.push(new Date(d));
                }
            }
        }
    }

    // If there are no auto-adjustable future weekdays, nothing to do
    if (futureWeekdaysAuto.length === 0) return;

    // Calculate remaining hours needed for auto-adjustable future days
    // Total needed - (hours worked up to today + manually modified future hours)
    const remainingHoursNeeded = requiredHoursTotal - actualHoursUpToToday - futureWeekdaysManual;
    const hoursPerFutureDay = remainingHoursNeeded / futureWeekdaysAuto.length;

    // Clamp to min/max range and round
    const adjustedHours = roundHours(Math.max(4, Math.min(12, hoursPerFutureDay)));

    // Update only the auto-adjustable future weekdays in storage and DOM
    futureWeekdaysAuto.forEach(date => {
        const dateStr = formatDate(date);
        saveHours(date, adjustedHours, false); // Save as auto-adjusted (not manual)

        // Find and update the bar in DOM without re-rendering
        const barContainer = document.querySelector(`[data-date="${dateStr}"]`);
        if (barContainer) {
            const bar = barContainer.querySelector('.hours-bar');
            const display = barContainer.querySelector('.hours-display');
            if (bar && display) {
                const isMobile = window.innerWidth <= 768;
                const sizePercent = getBarHeightPercent(adjustedHours);
                if (isMobile) {
                    bar.style.width = `${sizePercent}%`;
                    bar.style.height = '100%';
                } else {
                    bar.style.height = `${sizePercent}%`;
                }
                display.textContent = formatHoursMinutes(adjustedHours);
                updateBarColor(bar, adjustedHours);
            }
        }
    });
}

// Calculate bar height percentage based on hours (4h = 15%, 13h = 100%)
function getBarHeightPercent(hours) {
    const minHours = 4;
    const maxHours = 13;
    const minPercent = 15; // Minimum visible height for 4 hours
    const maxPercent = 100;

    const range = maxPercent - minPercent;
    return minPercent + ((hours - minHours) / (maxHours - minHours)) * range;
}

// Calculate hours from bar height percentage
function getHoursFromPercent(percent) {
    const minHours = 4;
    const maxHours = 13;
    const minPercent = 15; // Match the minimum from getBarHeightPercent
    const maxPercent = 100;

    // Map percent back to hours considering the minimum
    const adjustedPercent = Math.max(0, Math.min(100, percent));
    const hours = minHours + ((adjustedPercent - minPercent) / (maxPercent - minPercent)) * (maxHours - minHours);

    return roundHours(Math.max(minHours, Math.min(maxHours, hours)));
}

// Create vertical bar for a day
function createBar(date, initialValue) {
    const container = document.createElement('div');
    container.className = 'hours-bar-container';
    container.dataset.date = formatDate(date);

    const bar = document.createElement('div');
    bar.className = 'hours-bar';

    const display = document.createElement('div');
    display.className = 'hours-display';
    display.textContent = formatHoursMinutes(initialValue);

    // Set initial size (height for desktop, width for mobile)
    const sizePercent = getBarHeightPercent(initialValue);
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
        bar.style.width = `${sizePercent}%`;
        bar.style.height = '100%';
    } else {
        bar.style.height = `${sizePercent}%`;
    }
    updateBarColor(bar, initialValue);

    bar.appendChild(display);
    container.appendChild(bar);

    // Handle click and drag to adjust hours
    let isDragging = false;

    const updateHoursFromClick = (e) => {
        const rect = container.getBoundingClientRect();
        const isMobile = window.innerWidth <= 768;

        let clickPercent;

        if (isMobile) {
            // Mobile: horizontal (left to right)
            const clickX = e.clientX - rect.left;
            const containerWidth = rect.width;
            clickPercent = (clickX / containerWidth) * 100;
        } else {
            // Desktop: vertical (bottom to top)
            const clickY = e.clientY - rect.top;
            const containerHeight = rect.height;
            clickPercent = ((containerHeight - clickY) / containerHeight) * 100;
        }

        const newHours = getHoursFromPercent(Math.max(0, Math.min(100, clickPercent)));

        // Update bar
        if (isMobile) {
            bar.style.width = `${getBarHeightPercent(newHours)}%`;
            bar.style.height = '100%';
        } else {
            bar.style.height = `${getBarHeightPercent(newHours)}%`;
        }
        display.textContent = formatHoursMinutes(newHours);
        updateBarColor(bar, newHours);
        saveHours(date, newHours, true); // Mark as manually modified

        // Add lock icon immediately
        addLockIcon(date);

        // Auto-adjust future weekdays
        autoAdjustFutureWeekdays();
        updateSummary();
    };

    // Mouse events
    container.addEventListener('mousedown', (e) => {
        isDragging = true;
        updateHoursFromClick(e);
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            updateHoursFromClick(e);
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });

    // Touch events for mobile
    container.addEventListener('touchstart', (e) => {
        isDragging = true;
        const touch = e.touches[0];
        updateHoursFromClick(touch);
        e.preventDefault();
    });

    document.addEventListener('touchmove', (e) => {
        if (isDragging && e.touches.length > 0) {
            const touch = e.touches[0];
            updateHoursFromClick(touch);
        }
    });

    document.addEventListener('touchend', () => {
        isDragging = false;
    });

    return container;
}

// Update bar color based on hours
function updateBarColor(bar, hours) {
    bar.classList.remove('low', 'normal', 'high', 'extreme');
    if (hours <= 4) {
        bar.classList.add('low');        // 4h 이하: 파란색
    } else if (hours <= 8) {
        bar.classList.add('normal');     // 4-8h: 초록색
    } else if (hours <= 10) {
        bar.classList.add('high');       // 8-10h: 주황색
    } else {
        bar.classList.add('extreme');    // 10h 초과: 붉은색
    }
}

// Create a day cell
function createDayCell(date, isOtherMonth, calendarGrid) {
    const cell = document.createElement('div');
    cell.className = 'day-cell';
    cell.dataset.date = formatDate(date);  // Add data-date attribute for precise date identification

    const isWeekendDay = isWeekend(date);
    const holidayName = isHoliday(date);
    const isVacationDay = isVacation(date);
    const isToday = date.toDateString() === today.toDateString();

    if (isOtherMonth) {
        cell.classList.add('other-month');
    }

    if (isWeekendDay) {
        cell.classList.add('weekend');
    }

    if (holidayName) {
        cell.classList.add('holiday');
    }

    if (isVacationDay) {
        cell.classList.add('vacation');
    }

    if (isToday) {
        cell.classList.add('today');
    }

    // Day of week (요일) - 모바일에서만 표시됨 (CSS로 제어)
    const dayOfWeekNames = ['일', '월', '화', '수', '목', '금', '토'];
    const dayOfWeek = document.createElement('div');
    dayOfWeek.className = 'day-of-week';
    dayOfWeek.textContent = dayOfWeekNames[date.getDay()];
    cell.appendChild(dayOfWeek);

    // Checkbox and lock icon container (체크박스와 자물쇠를 세로로 배치)
    if (!isWeekendDay && !holidayName && !isOtherMonth) {
        const checkboxLockContainer = document.createElement('div');
        checkboxLockContainer.className = 'checkbox-lock-container';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'exclude-checkbox';
        checkbox.checked = isVacationDay;
        checkbox.title = '체크하면 계산에서 제외';
        checkbox.addEventListener('change', () => {
            toggleVacation(date);
        });
        checkboxLockContainer.appendChild(checkbox);

        // Add lock icon for manually modified days (only current month)
        if (isManuallyModified(date)) {
            const lockIcon = document.createElement('span');
            lockIcon.className = 'lock-icon locked';
            lockIcon.title = '클릭하여 잠금 해제 (자동 조정 허용)';
            lockIcon.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleManualLock(date);
            });
            checkboxLockContainer.appendChild(lockIcon);
        }

        cell.appendChild(checkboxLockContainer);
    }

    // Day number
    const dayNumber = document.createElement('div');
    dayNumber.className = 'day-number';

    const dayText = document.createElement('span');
    dayText.textContent = date.getDate();
    dayNumber.appendChild(dayText);

    cell.appendChild(dayNumber);

    // Holiday name
    if (holidayName && !isOtherMonth) {
        const holidayLabel = document.createElement('div');
        holidayLabel.className = 'holiday-name';
        holidayLabel.textContent = holidayName;
        cell.appendChild(holidayLabel);
    }

    // Excluded label (제외됨)
    if (isVacationDay && !isOtherMonth) {
        const excludedLabel = document.createElement('div');
        excludedLabel.className = 'excluded-label';
        excludedLabel.textContent = '제외됨';
        cell.appendChild(excludedLabel);
    }

    // Add vertical bar only for weekdays (not weekends, holidays, or vacation) and current month
    if (!isWeekendDay && !holidayName && !isVacationDay && !isOtherMonth) {
        const hoursControl = document.createElement('div');
        hoursControl.className = 'hours-control';

        const hoursValue = loadHours(date);
        const bar = createBar(date, hoursValue);

        hoursControl.appendChild(bar);
        cell.appendChild(hoursControl);
    }

    calendarGrid.appendChild(cell);
}

// Render calendar (always 5 rows)
function renderCalendar(year, month) {
    const monthNames = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
    document.getElementById('currentMonth').textContent = `${year}년 ${monthNames[month]}`;

    const calendarGrid = document.getElementById('calendarGrid');

    // Remove all existing day cells (but keep the headers)
    const existingCells = calendarGrid.querySelectorAll('.day-cell');
    existingCells.forEach(cell => cell.remove());

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startingDayOfWeek = firstDay.getDay();

    // Previous month's dates
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
        const day = prevMonthLastDay - i;
        const date = new Date(year, month - 1, day);
        createDayCell(date, true, calendarGrid);
    }

    // Current month's dates
    for (let day = 1; day <= lastDay.getDate(); day++) {
        const date = new Date(year, month, day);
        createDayCell(date, false, calendarGrid);
    }

    // Next month's dates (fill to 5 or 6 rows depending on month length)
    const currentCells = startingDayOfWeek + lastDay.getDate();
    const totalCells = currentCells <= 35 ? 35 : 42; // 5 rows (35) or 6 rows (42)
    const nextMonthDays = totalCells - currentCells;

    for (let day = 1; day <= nextMonthDays; day++) {
        const date = new Date(year, month + 1, day);
        createDayCell(date, true, calendarGrid);
    }

    updateSummary();
}
