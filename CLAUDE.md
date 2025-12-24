# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Work Calendar is a pure vanilla JavaScript web application for managing flexible work hours (선택적 근로제). The entire application runs client-side with no dependencies, frameworks, or build process. All data is stored in localStorage.

## Development Commands

### Running the Application
```bash
# Simply open in browser
open index.html

# Or use a local server (optional)
python -m http.server 8000
# Then visit http://localhost:8000
```

### Testing
- No automated tests - test manually in browser
- Test on multiple browsers: Chrome, Firefox, Safari, Edge
- Test mobile responsiveness

## Architecture

### File Structure
- `index.html` - Main HTML structure
- `style.css` - All styles (CSS Grid, Flexbox, gradients)
- `script.js` - All application logic (~1000 lines)
- `holidays.txt` - Public holiday data in CSV format (YYYY-MM-DD,name)

### Core Data Structure (localStorage)

**Work hours data** (key pattern: `workHours_YYYY-MM`):
```javascript
{
  "2025-12": {
    "2025-12-23": {
      hours: 8.5,        // Decimal hours (1-minute precision: 1/60)
      manual: true,      // Whether manually adjusted (locks auto-adjustment)
      vacation: false    // Whether marked as vacation day
    }
  }
}
```

**Holiday data** (key: `koreanHolidays`):
```javascript
[
  { date: "2025-01-01", name: "신정" },
  { date: "2025-01-29", name: "설날" }
]
```

### Key Algorithms

**Time precision**: All time values use 1-minute precision (1/60 hour increments)
- Rounding: `Math.round(hours * 60) / 60`
- Example: 8.456h → 8.450h (8h 27m)

**Auto-adjustment algorithm** (`autoAdjustFutureWeekdays()`):
1. Calculate actual work hours up to yesterday
2. Calculate required hours for the month (weekdays × 8h, excluding holidays/vacations)
3. Calculate deficit/surplus
4. Find future weekdays that are NOT manually locked
5. Distribute deficit/surplus equally among unlocked future weekdays
6. Update DOM directly (no full re-render)

**Height calculation for visual bars**:
- Range: 4h = 15%, 13h = 100%
- Formula: `heightPercent = 15 + ((hours - 4) / (13 - 4)) * 85`

**Color classes** (based on hours):
- `low` (blue): ≤ 4h
- `normal` (green): 4h-8h
- `high` (orange): 8h-10h
- `extreme` (red): > 10h

### State Management

**Manual lock system**:
- When user adjusts time → `manual: true` → 🔒 icon appears
- Locked dates excluded from auto-adjustment
- Click 🔒 icon → unlocks → included in auto-adjustment again

**Vacation system**:
- Checkbox visible only on weekdays (not weekends/holidays)
- Checked → `vacation: true` → yellow background + "제외됨" label
- Excluded from all calculations (like weekends/holidays)

### Performance Optimizations

**Avoid full re-renders**:
- When adjusting hours bar: update only that specific DOM element
- When adding/removing lock icon: direct DOM manipulation
- Full `renderCalendar()` only when: month navigation, vacation toggle, data import, holiday changes

**Event handling**:
- Drag events use document-level listeners to capture movement outside element
- Cleanup listeners on mouseup to prevent memory leaks

## Important Implementation Details

### Date Handling
- Always use `date.setHours(0, 0, 0, 0)` when comparing dates (ignore time component)
- Date format: `YYYY-MM-DD` (use `formatDate()` helper)
- Month is 0-indexed (January = 0, December = 11)

### Calendar Rendering
- Shows previous/next month dates to fill grid
- Grid size: 35 cells (5 rows) or 42 cells (6 rows) depending on month
- Previous/next month dates have class `other-month` (opacity: 0.3, no interactions)

### Data Import System
Parses company intranet work time data:
- Expected format: `YYYY-MM-DD  업무/휴게  HH:MM ~ HH:MM (HH:MM)`
- Extracts time from parentheses: `(07:03)` → 7.05h
- Calculates: actual work = total work time - break time
- Skips modification history lines (lines starting with `*`, containing `사유:`, `시간 수정`, etc.)
- Auto-marks missing weekdays as vacation

### Holiday Management
- Loaded from localStorage, fallback to `defaultHolidays` array in script.js
- Users can edit via modal (CSV format: YYYY-MM-DD,name)
- Export/import as txt file for backup/sharing
- Comma in name supported: `parts.slice(1).join(',').trim()`
- Auto-sorted by date after save

## Code Style Guidelines

### JavaScript
- Function names: `camelCase`
- No ES6 modules - all code in single file
- Use ES6+ features: arrow functions, const/let, template literals
- Comments in Korean or English

### CSS
- Class names: `kebab-case` (e.g., `.day-cell`, `.manage-holidays-button`)
- IDs: `camelCase` (e.g., `#currentMonth`, `#holidayTextarea`)
- Layout: CSS Grid for calendar, Flexbox for components

### HTML
- Indentation: 4 spaces
- Semantic HTML5 elements where appropriate

## Common Tasks

### Adding New Features
1. Check if it requires new localStorage data → update data structure
2. Add UI elements to index.html
3. Add event listeners in `setupEventListeners()`
4. Implement logic in script.js
5. Add styles to style.css
6. Test all interactions manually

### Modifying Auto-Adjustment
- Core logic in `autoAdjustFutureWeekdays()`
- Affects: summary panel, future weekday hours
- Must preserve manual locks and vacation flags
- Update only unlocked future dates

### Working with Dates
- Use `formatDate(date)` to convert Date to string
- Use `isWeekend(date)`, `isHoliday(date)`, `isVacation(date)` helpers
- Today boundary: defined at app initialization (`today` global variable)

## Browser Compatibility
- Target: Modern browsers (Chrome, Firefox, Safari, Edge)
- No IE support
- Uses: localStorage, FileReader API, Blob API, CSS Grid
- No polyfills needed for target browsers

## Debugging Tips
- All data in localStorage - check DevTools Application tab
- Key patterns: `workHours_YYYY-MM`, `koreanHolidays`
- Console.log in auto-adjustment to trace calculation
- Check if date is correctly classified (weekend/holiday/vacation/manual)
