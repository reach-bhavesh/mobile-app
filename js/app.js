/**
 * SMART INSURANCE OS - IPHONE MULTI-APP & SWIPE-TO-CLOSE ENGINE
 * 18 Standalone Apps (Screenshot 3) + iOS Dynamic Island & Swipe-up Dismiss Gesture
 */

// Global OS State
let runningApps = ['dashboard', 'claims', 'investment', 'clients']; // Initial running apps
let activeAppId = 'dashboard';
let isAppSwitcherOpen = false;

// Complete Registry for ALL 18 Apps from User Screenshot 3
const APP_REGISTRY = {
  dashboard: {
    id: 'dashboard',
    name: 'Dashboard',
    icon: 'fa-table-columns',
    gradient: 'bg-gradient-blue',
    color: '#007aff',
    summary: 'Executive Overview • KPIs & Today Schedule'
  },
  clients: {
    id: 'clients',
    name: 'Client Management',
    icon: 'fa-users',
    gradient: 'bg-gradient-indigo',
    color: '#5856d6',
    summary: '1,428 Registered Clients & Families'
  },
  support: {
    id: 'support',
    name: 'Client Support',
    icon: 'fa-headset',
    gradient: 'bg-gradient-sky',
    color: '#0284c7',
    summary: 'Helpdesk Tickets & Fast Resolutions'
  },
  general: {
    id: 'general',
    name: 'General Insurance',
    icon: 'fa-car-side',
    gradient: 'bg-gradient-amber',
    color: '#ff9500',
    summary: '395 Motor, Health & Commercial Policies'
  },
  life: {
    id: 'life',
    name: 'Life Insurance',
    icon: 'fa-heart-pulse',
    gradient: 'bg-gradient-rose',
    color: '#ff2d55',
    summary: '520 Active Policies • ₹120 Cr Covered'
  },
  investment: {
    id: 'investment',
    name: 'Investment',
    icon: 'fa-chart-line',
    gradient: 'bg-gradient-teal',
    color: '#30b0c7',
    summary: 'AUM: ₹3.85 Cr • 318 Active SIPs'
  },
  claims: {
    id: 'claims',
    name: 'Claim Management',
    icon: 'fa-file-medical',
    gradient: 'bg-gradient-red',
    color: '#ff3b30',
    summary: '14 Active Claims • ₹18.6L Settled'
  },
  commission: {
    id: 'commission',
    name: 'Commission',
    icon: 'fa-indian-rupee-sign',
    gradient: 'bg-gradient-emerald',
    color: '#34c759',
    summary: 'Nov Payout: ₹2,84,500 • TDS Slip'
  },
  subagent: {
    id: 'subagent',
    name: 'Sub Agent',
    icon: 'fa-network-wired',
    gradient: 'bg-gradient-purple',
    color: '#af52de',
    summary: '16 POSP Agents & Hierarchy'
  },
  alteration: {
    id: 'alteration',
    name: 'Alteration & Endors.',
    icon: 'fa-pen-ruler',
    gradient: 'bg-gradient-orange',
    color: '#ff9500',
    summary: 'Nominee, Address & Mode Changes'
  },
  documents: {
    id: 'documents',
    name: 'Document Manage.',
    icon: 'fa-folder-closed',
    gradient: 'bg-gradient-yellow',
    color: '#ca8a04',
    summary: '915 Policy Bonds & 1,428 KYC Docs'
  },
  reports: {
    id: 'reports',
    name: 'Reports',
    icon: 'fa-file-invoice',
    gradient: 'bg-gradient-blue-dark',
    color: '#1d4ed8',
    summary: 'Business MIS, Target & Ledger'
  },
  target: {
    id: 'target',
    name: 'Target & Review',
    icon: 'fa-crosshairs',
    gradient: 'bg-gradient-pink',
    color: '#f43f5e',
    summary: 'MDRT Target 78% • Goal Progress'
  },
  master: {
    id: 'master',
    name: 'Master Management',
    icon: 'fa-sliders',
    gradient: 'bg-gradient-cyan',
    color: '#0891b2',
    summary: 'Insurance Companies & Plan Masters'
  },
  team: {
    id: 'team',
    name: 'Team Members',
    icon: 'fa-people-group',
    gradient: 'bg-gradient-violet',
    color: '#7c3aed',
    summary: 'Office Staff, Logins & Roles'
  },
  links: {
    id: 'links',
    name: 'Related Useful Links',
    icon: 'fa-link',
    gradient: 'bg-gradient-slate',
    color: '#475569',
    summary: 'IRDAI, LIC Merchant, Insurance Portals'
  },
  settings: {
    id: 'settings',
    name: 'Settings',
    icon: 'fa-gear',
    gradient: 'bg-gradient-zinc',
    color: '#3f3f46',
    summary: 'Agency AGY-884012 • Preferences'
  },
  smartconnect: {
    id: 'smartconnect',
    name: 'Smart Digital Connect',
    icon: 'fa-brands fa-whatsapp',
    gradient: 'bg-gradient-green',
    color: '#25d366',
    summary: '1-Click WhatsApp Reminders & Greetings'
  }
};

// Database Mock
let claimsData = [
  { id: "CLM-9041", client: "Manishbhai Desai", company: "Care Health", type: "cashless", hospital: "Zydus Hospital, Ahmedabad", amount: "₹1,50,000", status: "Approved", date: "Today, 11:30 AM" },
  { id: "CLM-8812", client: "Suresh Patel", company: "ICICI Lombard", type: "motor", hospital: "Hyundai Workshop, Surat", amount: "₹48,000", status: "Surveyor Appointed", date: "Yesterday" },
  { id: "CLM-7619", client: "Rajeshbhai Patel", company: "HDFC Life", type: "cashless", hospital: "Apollo Hospitals", amount: "₹95,000", status: "In Process", date: "22 Nov 2026" }
];

let portfolioData = [
  { fundName: "Parag Parikh Flexi Cap Fund", category: "Flexi Cap", aum: "₹1,12,40,000", sipCount: 94, xirr: "+24.8%" },
  { fundName: "Nippon India Small Cap Fund", category: "Small Cap", aum: "₹92,80,000", sipCount: 76, xirr: "+31.2%" },
  { fundName: "SBI Bluechip Large Cap Fund", category: "Large Cap", aum: "₹78,50,000", sipCount: 68, xirr: "+18.6%" }
];

let clientsData = [
  { id: "CL-101", name: "Rajeshbhai Patel", city: "Ahmedabad", phone: "+91 98250 12345", type: "HNI", policies: 4, totalSumAssured: "₹1.50 Cr", annualPremium: "₹84,500" },
  { id: "CL-102", name: "Sureshkumar Mehta", city: "Surat", phone: "+91 94280 67890", type: "Retail", policies: 2, totalSumAssured: "₹45.00 Lakh", annualPremium: "₹38,200" },
  { id: "CL-103", name: "Dharmesh Shah", city: "Vadodara", phone: "+91 98980 11223", type: "HNI", policies: 6, totalSumAssured: "₹3.20 Cr", annualPremium: "₹2,10,000" }
];

let supportTickets = [
  { id: "TCK-104", client: "Dharmesh Shah", subject: "Address update on HDFC policy", priority: "High", status: "In Progress", time: "1 hr ago" },
  { id: "TCK-102", client: "Pooja Joshi", subject: "Premium receipt for tax 80D", priority: "Medium", status: "Resolved", time: "Yesterday" }
];

let alterationsData = [
  { policy: "HD-99482103", client: "Rajeshbhai Patel", type: "Nominee Update", fromVal: "Neelamben Patel (Wife)", toVal: "Aarav Patel (Son)", date: "21 Nov 2026", status: "Approved" },
  { policy: "LIC-88294711", client: "Sureshkumar Mehta", type: "Payment Mode", fromVal: "Yearly", toVal: "NACH Monthly", date: "18 Nov 2026", status: "Completed" }
];

let usefulLinksData = [
  { name: "IRDAI Consumer Portal", url: "https://bimabharosa.irdai.gov.in", desc: "Insurance regulatory grievance & tracking", icon: "fa-shield-halved" },
  { name: "LIC Merchant / Portal", url: "https://licindia.in", desc: "Premium collection & policy statements", icon: "fa-building-columns" },
  { name: "HDFC Life Connect", url: "https://hdfclife.com", desc: "Advisor login & instant quote illustrator", icon: "fa-heart-pulse" },
  { name: "Star Health Atom", url: "https://starhealth.in", desc: "Health cashless intimation & claims", icon: "fa-hospital" },
  { name: "ICICI Lombard Agent Partner", url: "https://icicilombard.com", desc: "Instant car & commercial policy issuing", icon: "fa-car" }
];

let teamMembers = [
  { name: "Manoj Joshi", role: "Back-Office Manager", access: "Full Admin", phone: "+91 98250 44556" },
  { name: "Priya Vaghela", role: "Claims Coordinator", access: "Claims & Support", phone: "+91 94280 22334" },
  { name: "Anil Parmar", role: "Tele-Calling Executive", access: "Renewals & Calling", phone: "+91 99090 77889" }
];

// Initialize on Load
document.addEventListener('DOMContentLoaded', () => {
  initClock();
  setupDesktopControls();
  renderAllFeeds();
  updateDynamicIsland();
  openApp('dashboard'); // Start on Dashboard
});

// Clock & Date
function initClock() {
  function updateTime() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    
    const timeStr = `${hours}:${minutes}`;
    const statusTimeEl = document.getElementById('statusTime');
    const homeLargeClock = document.getElementById('homeLargeClock');
    
    if (statusTimeEl) statusTimeEl.textContent = timeStr;
    if (homeLargeClock) homeLargeClock.textContent = timeStr;
  }
  setInterval(updateTime, 1000);
  updateTime();
}

function updateDynamicIsland() {
  const countEl = document.getElementById('islandAppCount');
  if (countEl) {
    countEl.textContent = `${runningApps.length} Apps`;
  }
}

// Setup Desktop Viewer Bar Controls
function setupDesktopControls() {
  const btnPhoneFrame = document.getElementById('btnPhoneFrame');
  const btnFullResponsive = document.getElementById('btnFullResponsive');
  const btnQuickSwitcher = document.getElementById('btnQuickSwitcher');

  if (btnPhoneFrame && btnFullResponsive) {
    btnPhoneFrame.addEventListener('click', () => {
      document.body.classList.remove('full-responsive-mode');
      btnPhoneFrame.classList.add('active');
      btnFullResponsive.classList.remove('active');
      showToast('iPhone Frame View');
    });

    btnFullResponsive.addEventListener('click', () => {
      document.body.classList.add('full-responsive-mode');
      btnFullResponsive.classList.add('active');
      btnPhoneFrame.classList.remove('active');
      showToast('Full Screen Responsive View');
    });
  }

  if (btnQuickSwitcher) {
    btnQuickSwitcher.addEventListener('click', toggleAppSwitcher);
  }
}

// ==========================================================================
// OS MULTI-APP LIFECYCLE
// ==========================================================================

function openApp(appId) {
  if (!runningApps.includes(appId)) {
    runningApps.push(appId);
  }
  activeAppId = appId;

  closeAppSwitcher();
  updateDynamicIsland();

  // Deactivate all app windows
  document.querySelectorAll('.app-window').forEach(win => win.classList.remove('active'));

  // Activate target
  const targetWin = document.getElementById(`appWindow-${appId}`);
  if (targetWin) {
    targetWin.classList.add('active');
  }

  const appMeta = APP_REGISTRY[appId];
  if (appMeta) {
    showToast(`Switched to ${appMeta.name}`);
  }
}

function toggleAppSwitcher() {
  if (isAppSwitcherOpen) {
    closeAppSwitcher();
  } else {
    openAppSwitcher();
  }
}

function openAppSwitcher() {
  isAppSwitcherOpen = true;
  const switcher = document.getElementById('recentsSwitcherOverlay');
  if (!switcher) return;

  renderRecentsCards();
  switcher.classList.add('open');
}

function closeAppSwitcher() {
  isAppSwitcherOpen = false;
  const switcher = document.getElementById('recentsSwitcherOverlay');
  if (switcher) switcher.classList.remove('open');
}

// ==========================================================================
// IPHONE APP SWITCHER: CAROUSEL & SWIPE-UP TO CLOSE GESTURE
// ==========================================================================

function renderRecentsCards() {
  const container = document.getElementById('recentsCardsTrack');
  const dockStrip = document.getElementById('recentsDockStrip');
  if (!container) return;

  if (runningApps.length === 0) {
    container.innerHTML = `
      <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; color: #fff; width: 100%; text-align: center;">
        <i class="fa-solid fa-layer-group" style="font-size: 44px; opacity: 0.35; margin-bottom: 12px;"></i>
        <h4>No Recent Apps</h4>
        <p style="font-size: 11px; color: #8e8e93; margin-top: 4px;">Tap any app on Home Screen to open</p>
      </div>
    `;
    if (dockStrip) dockStrip.innerHTML = '';
    return;
  }

  // Reverse so newest is first
  const reversed = [...runningApps].reverse();

  container.innerHTML = reversed.map(appId => {
    const app = APP_REGISTRY[appId];
    if (!app) return '';

    return `
      <div class="recent-card" id="recentCard-${app.id}" data-app-id="${app.id}" onclick="handleCardClick('${app.id}')">
        <!-- Card Top Bar -->
        <div class="recent-card-head">
          <div class="recent-card-brand">
            <i class="fa-solid ${app.icon}" style="color: ${app.color};"></i>
            <span class="recent-card-title">${app.name}</span>
          </div>
          <div class="recent-card-actions">
            <button class="recent-close-app-btn" onclick="event.stopPropagation(); closeAppFromSwitcher('${app.id}')" title="Close">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
        </div>

        <!-- Live Content Snapshot -->
        <div class="recent-card-preview">
          ${getAppPreviewHTML(app.id)}
        </div>
      </div>
    `;
  }).join('');

  // Render bottom dock shortcuts
  if (dockStrip) {
    dockStrip.innerHTML = runningApps.slice(-5).map(appId => {
      const app = APP_REGISTRY[appId];
      if (!app) return '';
      return `<div class="dock-mini-icon ${app.gradient}" onclick="openApp('${app.id}')" title="${app.name}"><i class="fa-solid ${app.icon}"></i></div>`;
    }).join('');
  }

  // Attach iOS Swipe-Up Gesture to each card
  attachSwipeUpGestures();
}

// Attach Touch & Mouse Drag Listeners for Swipe-Up Dismiss
function attachSwipeUpGestures() {
  const cards = document.querySelectorAll('.recent-card');

  cards.forEach(card => {
    let startY = 0;
    let currentY = 0;
    let isDragging = false;
    let appId = card.getAttribute('data-app-id');

    // Touch Events
    card.addEventListener('touchstart', (e) => {
      startY = e.touches[0].clientY;
      isDragging = true;
      card.classList.add('swiping-up');
    }, { passive: true });

    card.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      currentY = e.touches[0].clientY;
      let deltaY = currentY - startY;

      // Only allow dragging upwards
      if (deltaY < 0) {
        card.style.transform = `translateY(${deltaY}px) scale(${1 - Math.abs(deltaY) / 1000})`;
        card.style.opacity = `${1 - Math.abs(deltaY) / 400}`;
      }
    }, { passive: true });

    card.addEventListener('touchend', () => {
      if (!isDragging) return;
      isDragging = false;
      card.classList.remove('swiping-up');

      let deltaY = currentY - startY;
      if (currentY !== 0 && deltaY < -75) {
        // Dismiss card with flying animation!
        dismissCard(card, appId);
      } else {
        // Snap back to position
        card.style.transform = '';
        card.style.opacity = '';
      }
      startY = 0;
      currentY = 0;
    });

    // Mouse Drag Support for Desktop testing
    let mouseDown = false;
    card.addEventListener('mousedown', (e) => {
      startY = e.clientY;
      mouseDown = true;
      card.classList.add('swiping-up');
    });

    window.addEventListener('mousemove', (e) => {
      if (!mouseDown) return;
      currentY = e.clientY;
      let deltaY = currentY - startY;
      if (deltaY < 0) {
        card.style.transform = `translateY(${deltaY}px) scale(${1 - Math.abs(deltaY) / 1000})`;
        card.style.opacity = `${1 - Math.abs(deltaY) / 400}`;
      }
    });

    window.addEventListener('mouseup', () => {
      if (!mouseDown) return;
      mouseDown = false;
      card.classList.remove('swiping-up');

      let deltaY = currentY - startY;
      if (currentY !== 0 && deltaY < -75) {
        dismissCard(card, appId);
      } else {
        card.style.transform = '';
        card.style.opacity = '';
      }
      startY = 0;
      currentY = 0;
    });
  });
}

function handleCardClick(appId) {
  openApp(appId);
}

// Dismiss / Fly-up Card Animation (iOS Style)
function dismissCard(cardElement, appId) {
  cardElement.classList.add('card-dismiss-up');
  showToast(`Swiped to close: ${APP_REGISTRY[appId]?.name || appId}`);

  setTimeout(() => {
    closeAppFromSwitcher(appId);
  }, 220);
}

// Close single app
function closeAppFromSwitcher(appId) {
  runningApps = runningApps.filter(id => id !== appId);

  if (activeAppId === appId) {
    if (runningApps.length > 0) {
      activeAppId = runningApps[runningApps.length - 1];
    } else {
      activeAppId = null;
      document.querySelectorAll('.app-window').forEach(win => win.classList.remove('active'));
    }
  }

  const closedWin = document.getElementById(`appWindow-${appId}`);
  if (closedWin) closedWin.classList.remove('active');

  updateDynamicIsland();
  renderRecentsCards();
}

// Close All Apps
function closeAllApps() {
  const cards = document.querySelectorAll('.recent-card');
  cards.forEach((card, index) => {
    setTimeout(() => {
      card.classList.add('card-dismiss-up');
    }, index * 40);
  });

  setTimeout(() => {
    runningApps = [];
    activeAppId = null;
    document.querySelectorAll('.app-window').forEach(win => win.classList.remove('active'));
    closeAppSwitcher();
    updateDynamicIsland();
    showToast('All apps closed. Back to Home');
  }, (cards.length * 40) + 200);
}

// Home Indicator Bar Action
function handleHomeBarClick() {
  if (isAppSwitcherOpen) {
    closeAppSwitcher();
  } else if (activeAppId && document.getElementById(`appWindow-${activeAppId}`)?.classList.contains('active')) {
    goHome();
  } else {
    openAppSwitcher();
  }
}

function goHome() {
  closeAppSwitcher();
  closeUniversalModalDirect();
  document.querySelectorAll('.app-window').forEach(win => win.classList.remove('active'));
  showToast('iPhone Home');
}

// ==========================================================================
// CARD SNAPSHOTS IN IPHONE SWITCHER
// ==========================================================================

function getAppPreviewHTML(appId) {
  switch (appId) {
    case 'dashboard':
      return `
        <div class="preview-mini-metric" style="border-left: 3px solid #007aff;">
          <span>Clients: <strong>1,428</strong></span>
          <strong style="color: #34c759;">₹2.84L Mo.</strong>
        </div>
        <div style="background:#fff;border-radius:10px;padding:8px;border:1px solid #e2e8f0;font-size:11px;">
          <strong>Executive Overview Active</strong>
          <span style="display:block;color:#64748b;font-size:10px;">MDRT Target: 78% Achieved</span>
        </div>
      `;
    case 'claims':
      return `
        <div class="preview-mini-metric" style="border-left: 3px solid #ff3b30;">
          <span>Active Claims: <strong>14</strong></span>
          <strong style="color: #34c759;">98.4% Ratio</strong>
        </div>
        <div style="background:#fff;border-radius:10px;padding:8px;border:1px solid #e2e8f0;font-size:11px;">
          <strong>Manishbhai Desai</strong>
          <span style="display:block;color:#16a34a;font-weight:700;font-size:10px;">Approved ₹1,50,000 (Zydus)</span>
        </div>
      `;
    case 'investment':
      return `
        <div class="preview-mini-metric" style="border-left: 3px solid #30b0c7;">
          <span>Total AUM: <strong>₹3.85 Cr</strong></span>
          <strong style="color: #0d9488;">+21.4% XIRR</strong>
        </div>
        <div style="background:#fff;border-radius:10px;padding:8px;border:1px solid #e2e8f0;font-size:11px;">
          <strong>318 Active SIPs</strong>
          <span style="display:block;color:#64748b;font-size:10px;">Parag Parikh + Nippon Small Cap</span>
        </div>
      `;
    case 'clients':
      return `
        <div class="preview-mini-metric" style="border-left: 3px solid #5856d6;">
          <span>Client Directory: <strong>1,428</strong></span>
          <strong style="color: #5856d6;">HNI / Retail</strong>
        </div>
        <div style="background:#fff;border-radius:10px;padding:8px;border:1px solid #e2e8f0;font-size:11px;">
          <strong>Rajeshbhai Patel</strong>
          <span style="display:block;color:#64748b;font-size:10px;">Ahmedabad • 4 Active Policies</span>
        </div>
      `;
    default:
      const meta = APP_REGISTRY[appId];
      return `
        <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;color:#64748b;text-align:center;">
          <i class="fa-solid ${meta?.icon || 'fa-circle-check'}" style="font-size:32px;color:${meta?.color || '#007aff'};margin-bottom:8px;"></i>
          <strong style="font-size:12px;color:#0f172a;">${meta?.name || appId}</strong>
          <span style="font-size:10px;color:#8e8e93;margin-top:2px;">${meta?.summary || 'Active in background'}</span>
        </div>
      `;
  }
}

// ==========================================================================
// RENDER ALL FEEDS FOR ALL 18 APPS
// ==========================================================================

function renderAllFeeds() {
  renderClaimsFeed(claimsData);
  renderPortfolios();
  renderClientsApp(clientsData);
  renderLifeFeed();
  renderGeneralFeed();
  renderSubAgents();
  renderSupportTickets();
  renderEndorsements();
  renderUsefulLinks();
  renderTeamMembers();
  renderTargetReview();
  renderMasters();
}

function renderSupportTickets() {
  const container = document.getElementById('supportTicketsFeed');
  if (!container) return;

  container.innerHTML = supportTickets.map(t => `
    <div class="claim-card-row">
      <div class="claim-head-row">
        <span style="font-size: 11px; font-weight: 800; color: #0284c7;">${t.id}</span>
        <span class="claim-badge ${t.status === 'Resolved' ? 'badge-approved' : 'badge-pending'}">${t.status}</span>
      </div>
      <h4 style="font-size: 13px; font-weight: 800; margin-bottom: 2px;">${t.subject}</h4>
      <p style="font-size: 11px; color: #64748b;">Client: <strong>${t.client}</strong> • Priority: <strong style="color: #dc2626;">${t.priority}</strong></p>
      <div style="display: flex; justify-content: flex-end; margin-top: 6px;">
        <button onclick="showToast('Resolving ticket ${t.id}...');" style="background: #0284c7; color: #fff; border: none; padding: 4px 10px; border-radius: 6px; font-size: 10.5px; font-weight: 700; cursor: pointer;">
          Resolve & Notify Client
        </button>
      </div>
    </div>
  `).join('');
}

function renderEndorsements() {
  const container = document.getElementById('endorsementsFeed');
  if (!container) return;

  container.innerHTML = alterationsData.map(a => `
    <div class="claim-card-row">
      <div class="claim-head-row">
        <span style="font-size: 11px; font-weight: 800; color: #ea580c;">Policy: ${a.policy}</span>
        <span class="claim-badge badge-approved">${a.status}</span>
      </div>
      <h4 style="font-size: 13px; font-weight: 800; margin-bottom: 2px;">${a.type}</h4>
      <p style="font-size: 11px; color: #64748b;">${a.client} • <em>${a.fromVal}</em> ➔ <strong style="color: #16a34a;">${a.toVal}</strong></p>
    </div>
  `).join('');
}

function renderUsefulLinks() {
  const container = document.getElementById('usefulLinksFeed');
  if (!container) return;

  container.innerHTML = usefulLinksData.map(link => `
    <div class="claim-card-row" onclick="window.open('${link.url}', '_blank')" style="cursor: pointer;">
      <div style="display: flex; align-items: center; justify-content: space-between;">
        <div style="display: flex; align-items: center; gap: 10px;">
          <div style="width: 36px; height: 36px; border-radius: 10px; background: #f1f5f9; display: flex; align-items: center; justify-content: center; font-size: 16px; color: #007aff;">
            <i class="fa-solid ${link.icon}"></i>
          </div>
          <div>
            <h4 style="font-size: 13px; font-weight: 800;">${link.name}</h4>
            <span style="font-size: 10.5px; color: #64748b;">${link.desc}</span>
          </div>
        </div>
        <i class="fa-solid fa-arrow-up-right-from-square" style="font-size: 12px; color: #8e8e93;"></i>
      </div>
    </div>
  `).join('');
}

function renderTeamMembers() {
  const container = document.getElementById('teamMembersFeed');
  if (!container) return;

  container.innerHTML = teamMembers.map(m => `
    <div class="claim-card-row">
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <div>
          <h4 style="font-size: 13px; font-weight: 800;">${m.name}</h4>
          <span style="font-size: 11px; color: #64748b;">${m.role} • ${m.phone}</span>
        </div>
        <span style="font-size: 10px; background: #e0e7ff; color: #4338ca; padding: 2px 7px; border-radius: 6px; font-weight: 700;">${m.access}</span>
      </div>
    </div>
  `).join('');
}

function renderTargetReview() {
  const container = document.getElementById('targetReviewFeed');
  if (!container) return;

  container.innerHTML = `
    <div class="report-target-card" style="margin-bottom: 12px;">
      <div class="target-head-clean">
        <div>
          <label style="font-size: 10px; text-transform: uppercase; color: #94a3b8;">MDRT Qualification 2026</label>
          <h3 style="font-size: 16px; font-weight: 800; color: #38bdf8;">₹9,36,000 / ₹12,00,000</h3>
        </div>
        <span class="badge-target" style="background: #38bdf8; color: #000;">78% Done</span>
      </div>
      <div class="progress-bar-wrap">
        <div class="progress-bar-fill" style="width: 78%;"></div>
      </div>
      <p style="font-size: 11px; color: #cbd5e1;">Remaining: <strong>₹2,64,000</strong> in 37 days to qualify for Million Dollar Round Table.</p>
    </div>
  `;
}

function renderMasters() {
  const container = document.getElementById('mastersFeed');
  if (!container) return;

  container.innerHTML = `
    <div class="settings-list-card">
      <div class="setting-item-row" onclick="showToast('Insurance Companies: LIC, HDFC, Star, ICICI, Care')">
        <div class="s-left"><i class="fa-solid fa-shield-halved text-primary"></i> <span>Company Masters (12)</span></div>
        <i class="fa-solid fa-chevron-right text-xs text-muted"></i>
      </div>
      <div class="setting-item-row" onclick="showToast('Plan Masters: 48 Insurance Plans Active')">
        <div class="s-left"><i class="fa-solid fa-file-contract text-primary"></i> <span>Plan Masters (48)</span></div>
        <i class="fa-solid fa-chevron-right text-xs text-muted"></i>
      </div>
      <div class="setting-item-row" onclick="showToast('Bank Branches: Ahmedabad, Surat, Vadodara, Rajkot')">
        <div class="s-left"><i class="fa-solid fa-building-columns text-primary"></i> <span>Bank & Agency Branches</span></div>
        <i class="fa-solid fa-chevron-right text-xs text-muted"></i>
      </div>
    </div>
  `;
}

function renderClaimsFeed(claims) {
  const container = document.getElementById('claimsFeedList');
  if (!container) return;

  container.innerHTML = claims.map(c => `
    <div class="claim-card-row">
      <div class="claim-head-row">
        <span style="font-size: 11px; font-weight: 800; color: #007aff;">${c.id}</span>
        <span class="claim-badge ${c.status === 'Approved' ? 'badge-approved' : 'badge-pending'}">${c.status}</span>
      </div>
      <div style="font-size: 13px; font-weight: 800; margin-bottom: 2px;">${c.client}</div>
      <div style="font-size: 11px; color: #64748b; margin-bottom: 6px;">${c.company} • ${c.hospital}</div>
      <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #f1f5f9; padding-top: 6px; font-size: 11.5px;">
        <span>Claim: <strong style="color: #dc2626;">${c.amount}</strong></span>
        <span style="font-size: 10px; color: #94a3b8;">${c.date}</span>
      </div>
    </div>
  `).join('');
}

function filterClaimTab(type, el) {
  document.querySelectorAll('.sub-tab-btn').forEach(btn => btn.classList.remove('active'));
  if (el) el.classList.add('active');
  if (type === 'all') renderClaimsFeed(claimsData);
  else renderClaimsFeed(claimsData.filter(c => c.type === type));
}

function renderPortfolios() {
  const container = document.getElementById('portfolioListContainer');
  if (!container) return;

  container.innerHTML = portfolioData.map(fund => `
    <div style="background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 12px; margin-bottom: 10px;">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 4px;">
        <h5 style="font-size: 13px; font-weight: 800;">${fund.fundName}</h5>
        <span style="font-size: 11px; font-weight: 800; color: #34c759;">${fund.xirr}</span>
      </div>
      <div style="font-size: 11px; color: #64748b; margin-bottom: 8px;">${fund.category} • ${fund.sipCount} Active SIPs</div>
      <div style="display: flex; justify-content: space-between; background: #f8fafc; padding: 6px 10px; border-radius: 8px; font-size: 11px;">
        <span>Client AUM</span>
        <strong style="color: #0d9488;">${fund.aum}</strong>
      </div>
    </div>
  `).join('');
}

function renderClientsApp(clients) {
  const container = document.getElementById('appClientsFeed');
  if (!container) return;

  container.innerHTML = clients.map(client => `
    <div style="background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 12px; margin-bottom: 10px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
        <div>
          <h4 style="font-size: 13.5px; font-weight: 800;">${client.name}</h4>
          <span style="font-size: 11px; color: #64748b;">${client.city} • ${client.phone}</span>
        </div>
        <span style="font-size: 10px; background: #eff6ff; color: #007aff; font-weight: 700; padding: 3px 8px; border-radius: 20px;">${client.type}</span>
      </div>
      <div style="display: flex; justify-content: space-between; background: #f8fafc; padding: 6px 10px; border-radius: 8px; font-size: 11px; margin-bottom: 8px;">
        <span>Policies: <strong>${client.policies}</strong></span>
        <span>Premium: <strong style="color: #007aff;">${client.annualPremium}</strong></span>
      </div>
      <div style="display: flex; gap: 8px; justify-content: flex-end;">
        <button onclick="sendWhatsApp('${client.name}', '${client.phone}')" style="background: #25d366; color: #fff; border: none; padding: 6px 12px; border-radius: 8px; font-size: 11px; font-weight: 700; cursor: pointer;">
          <i class="fa-brands fa-whatsapp"></i> Chat
        </button>
        <button onclick="callPhone('${client.phone}')" style="background: #f1f5f9; color: #000; border: 1px solid #e2e8f0; padding: 6px 12px; border-radius: 8px; font-size: 11px; font-weight: 600; cursor: pointer;">
          <i class="fa-solid fa-phone"></i> Call
        </button>
      </div>
    </div>
  `).join('');
}

function searchClientsApp(query) {
  const q = query.toLowerCase();
  const filtered = clientsData.filter(c => c.name.toLowerCase().includes(q) || c.city.toLowerCase().includes(q) || c.phone.includes(q));
  renderClientsApp(filtered);
}

function renderLifeFeed(cat = 'all') {
  const container = document.getElementById('lifePoliciesFeed');
  if (!container) return;

  const data = [
    { plan: "HDFC Life Click 2 Protect Super", client: "Rajeshbhai Patel", sumAssured: "₹1,00,00,000", premium: "₹28,450/yr", company: "HDFC Life", status: "Due in 2 days" },
    { plan: "LIC Jeevan Labh (Table 936)", client: "Pooja Ben Joshi", sumAssured: "₹25,00,000", premium: "₹34,800/yr", company: "LIC of India", status: "Active" }
  ];

  container.innerHTML = data.map(p => `
    <div class="policy-card-row">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
        <span style="font-size: 10.5px; background: #fee2e2; color: #b91c1c; font-weight: 800; padding: 2px 7px; border-radius: 4px;">${p.company}</span>
        <span style="font-size: 11px; font-weight: 700; color: #dc2626;">${p.status}</span>
      </div>
      <h4 style="font-size: 13.5px; font-weight: 800; margin-bottom: 2px;">${p.plan}</h4>
      <span style="font-size: 11px; color: #64748b; display: block; margin-bottom: 6px;">Client: <strong>${p.client}</strong></span>
      <div style="display: flex; justify-content: space-between; background: #f8fafc; padding: 6px 10px; border-radius: 8px; font-size: 11px;">
        <span>Sum Assured: <strong>${p.sumAssured}</strong></span>
        <span>Premium: <strong style="color: #007aff;">${p.premium}</strong></span>
      </div>
    </div>
  `).join('');
}

function filterLifePlans(cat, el) {
  document.querySelectorAll('#appWindow-life .filter-chip').forEach(c => c.classList.remove('active'));
  if (el) el.classList.add('active');
  renderLifeFeed(cat);
}

function renderGeneralFeed(cat = 'all') {
  const container = document.getElementById('generalPoliciesFeed');
  if (!container) return;

  const data = [
    { plan: "Star Health Comprehensive (10L Floater)", client: "Sureshkumar Mehta", sumAssured: "₹10,00,000", premium: "₹19,200/yr", company: "Star Health", status: "Due in 4 days" },
    { plan: "ICICI Lombard Private Car (Creta)", client: "Rajeshbhai Patel", sumAssured: "IDV ₹11.5L", premium: "₹18,400/yr", company: "ICICI Lombard", status: "Active" }
  ];

  container.innerHTML = data.map(p => `
    <div class="policy-card-row">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
        <span style="font-size: 10.5px; background: #fef3c7; color: #b45309; font-weight: 800; padding: 2px 7px; border-radius: 4px;">${p.company}</span>
        <span style="font-size: 11px; font-weight: 700; color: #34c759;">${p.status}</span>
      </div>
      <h4 style="font-size: 13.5px; font-weight: 800; margin-bottom: 2px;">${p.plan}</h4>
      <span style="font-size: 11px; color: #64748b; display: block; margin-bottom: 6px;">Client: <strong>${p.client}</strong></span>
      <div style="display: flex; justify-content: space-between; background: #f8fafc; padding: 6px 10px; border-radius: 8px; font-size: 11px;">
        <span>Coverage: <strong>${p.sumAssured}</strong></span>
        <span>Premium: <strong style="color: #007aff;">${p.premium}</strong></span>
      </div>
    </div>
  `).join('');
}

function filterGeneralPlans(cat, el) {
  document.querySelectorAll('#appWindow-general .filter-chip').forEach(c => c.classList.remove('active'));
  if (el) el.classList.add('active');
  renderGeneralFeed(cat);
}

function renderSubAgents() {
  const container = document.getElementById('agentHierarchyContainer');
  if (!container) return;

  container.innerHTML = `
    <div class="claim-card-row">
      <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
        <strong style="font-size: 13px;">Hitesh Solanki (POSP-084)</strong>
        <span style="color: #34c759; font-weight: 700; font-size: 11px;">Active</span>
      </div>
      <p style="font-size: 11px; color: #64748b;">Policies: 14 • Commission: ₹38,200</p>
    </div>
    <div class="claim-card-row">
      <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
        <strong style="font-size: 13px;">Nirav Trivedi (POSP-112)</strong>
        <span style="color: #34c759; font-weight: 700; font-size: 11px;">Active</span>
      </div>
      <p style="font-size: 11px; color: #64748b;">Policies: 9 • Commission: ₹24,800</p>
    </div>
  `;
}

// ==========================================================================
// MODALS & ACTIONS
// ==========================================================================

function openModal(title, sub, icon, bodyHtml) {
  const backdrop = document.getElementById('universalModalBackdrop');
  const titleEl = document.getElementById('modalTitle');
  const subEl = document.getElementById('modalSubtitle');
  const iconBubble = document.getElementById('modalIconBubble');
  const bodyEl = document.getElementById('modalBody');

  if (titleEl) titleEl.textContent = title;
  if (subEl) subEl.textContent = sub;
  if (iconBubble) iconBubble.innerHTML = `<i class="fa-solid ${icon}"></i>`;
  if (bodyEl) bodyEl.innerHTML = bodyHtml;

  backdrop?.classList.add('open');
}

function closeUniversalModal(e) {
  if (e.target.id === 'universalModalBackdrop') closeUniversalModalDirect();
}

function closeUniversalModalDirect() {
  document.getElementById('universalModalBackdrop')?.classList.remove('open');
}

function openNewClaimModal() {
  openModal("File New Claim", "Hospital Cashless or Motor Survey", "fa-file-medical", `
    <form onsubmit="handleClaimSubmit(event)">
      <div style="margin-bottom: 10px;">
        <label style="font-size: 11px; font-weight: 700; display: block;">Client Name</label>
        <select id="claimClient" style="width: 100%; padding: 8px; border: 1px solid #cbd5e1; border-radius: 8px; margin-top: 4px;">
          ${clientsData.map(c => `<option value="${c.name}">${c.name}</option>`).join('')}
        </select>
      </div>
      <div style="margin-bottom: 12px;">
        <label style="font-size: 11px; font-weight: 700; display: block;">Estimated Amount (₹)</label>
        <input type="text" id="claimAmount" required placeholder="₹1,00,000" style="width: 100%; padding: 8px; border: 1px solid #cbd5e1; border-radius: 8px; margin-top: 4px;">
      </div>
      <button type="submit" style="width: 100%; background: #ff3b30; color: #fff; border: none; padding: 12px; border-radius: 10px; font-weight: 800; cursor: pointer;">
        Submit Claim Intimation
      </button>
    </form>
  `);
}

function handleClaimSubmit(e) {
  e.preventDefault();
  const client = document.getElementById('claimClient').value;
  const amount = document.getElementById('claimAmount').value;

  claimsData.unshift({
    id: "CLM-" + Math.floor(1000 + Math.random() * 9000),
    client: client,
    company: "Care Health",
    type: "cashless",
    hospital: "City Civil / Apollo",
    amount: amount,
    status: "In Process",
    date: "Just now"
  });

  renderClaimsFeed(claimsData);
  closeUniversalModalDirect();
  showToast(`Claim initiated for ${client}!`);
}

function openStartSIPModal() {
  openModal("Start New SIP", "Mutual Fund Systematic Investment", "fa-chart-line", `
    <div style="margin-bottom: 10px;">
      <label style="font-size: 11px; font-weight: 700;">Select Fund</label>
      <select style="width: 100%; padding: 8px; border: 1px solid #cbd5e1; border-radius: 8px; margin-top: 4px;">
        <option>Parag Parikh Flexi Cap Fund</option>
        <option>Nippon India Small Cap Fund</option>
        <option>SBI Bluechip Fund</option>
      </select>
    </div>
    <div style="margin-bottom: 14px;">
      <label style="font-size: 11px; font-weight: 700;">Monthly SIP Amount (₹)</label>
      <input type="text" value="₹10,000" style="width: 100%; padding: 8px; border: 1px solid #cbd5e1; border-radius: 8px; margin-top: 4px;">
    </div>
    <button onclick="showToast('e-Mandate link generated!'); closeUniversalModalDirect();" style="width: 100%; background: #007aff; color: #fff; border: none; padding: 12px; border-radius: 10px; font-weight: 800; cursor: pointer;">
      Generate e-Mandate Link
    </button>
  `);
}

function openAddClientDialog() {
  openModal("Add New Client", "Client KYC & Contact", "fa-user-plus", `
    <form onsubmit="handleClientCreate(event)">
      <div style="margin-bottom: 10px;">
        <label style="font-size: 11px; font-weight: 700;">Full Name *</label>
        <input type="text" id="newCName" required placeholder="e.g. Ketanbhai Shah" style="width: 100%; padding: 8px; border: 1px solid #cbd5e1; border-radius: 8px; margin-top: 4px;">
      </div>
      <div style="margin-bottom: 14px;">
        <label style="font-size: 11px; font-weight: 700;">Mobile Number *</label>
        <input type="tel" id="newCPhone" required placeholder="+91 98..." style="width: 100%; padding: 8px; border: 1px solid #cbd5e1; border-radius: 8px; margin-top: 4px;">
      </div>
      <button type="submit" style="width: 100%; background: #007aff; color: #fff; border: none; padding: 12px; border-radius: 10px; font-weight: 800; cursor: pointer;">
        Save Client Profile
      </button>
    </form>
  `);
}

function handleClientCreate(e) {
  e.preventDefault();
  const name = document.getElementById('newCName').value;
  const phone = document.getElementById('newCPhone').value;

  clientsData.unshift({
    id: "CL-" + Math.floor(100 + Math.random() * 900),
    name: name,
    city: "Gujarat",
    phone: phone,
    type: "Retail",
    policies: 1,
    totalSumAssured: "₹25.00 Lakh",
    annualPremium: "₹18,000"
  });

  renderClientsApp(clientsData);
  closeUniversalModalDirect();
  showToast(`Client "${name}" added!`);
}

function openNewTicketModal() {
  openModal("New Support Ticket", "Client Query or Grievance", "fa-headset", `
    <div style="margin-bottom: 10px;">
      <label style="font-size: 11px; font-weight: 700;">Subject</label>
      <input type="text" placeholder="e.g. Policy bond copy requested" style="width: 100%; padding: 8px; border: 1px solid #cbd5e1; border-radius: 8px;">
    </div>
    <button onclick="showToast('Support ticket logged!'); closeUniversalModalDirect();" style="width: 100%; background: #0284c7; color: #fff; border: none; padding: 12px; border-radius: 10px; font-weight: 800; cursor: pointer;">
      Submit Ticket
    </button>
  `);
}

function openEndorsementModal() {
  openModal("Request Policy Alteration", "Nominee, Address or Mode Change", "fa-pen-ruler", `
    <div style="margin-bottom: 10px;">
      <label style="font-size: 11px; font-weight: 700;">Policy Number</label>
      <input type="text" placeholder="e.g. HD-99482103" style="width: 100%; padding: 8px; border: 1px solid #cbd5e1; border-radius: 8px;">
    </div>
    <button onclick="showToast('Endorsement request submitted!'); closeUniversalModalDirect();" style="width: 100%; background: #ff9500; color: #fff; border: none; padding: 12px; border-radius: 10px; font-weight: 800; cursor: pointer;">
      Submit Request to Insurer
    </button>
  `);
}

function openSubAgentOnboardModal() {
  showToast('Opening POSP recruitment form...');
}

function openNewTeamModal() {
  showToast('Opening Team Member Invite form...');
}

function openAddPolicyModal(type) {
  showToast(`Opening new ${type} policy form...`);
}

function sendWhatsApp(clientName, phone) {
  const msg = `Namaste ${clientName} ji, from Bhavesh Patel (Financial Advisor). How can I assist you today?`;
  window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(msg)}`, '_blank');
}

function callPhone(phone) {
  window.location.href = `tel:${phone}`;
}

function downloadPayoutSlip() {
  showToast("Downloading November Commission Statement (PDF)...");
}

function downloadMISReport() {
  showToast("Downloading Executive Monthly MIS Report (PDF)...");
}

function generateReport(rep) {
  showToast(`Generating ${rep.toUpperCase()} report...`);
}

function sendBroadcast(type) {
  if (type === 'renewals') showToast("Automated renewal payment links sent!");
  else showToast("Festival greeting sent with your agency branding!");
}

function toggleDarkMode() {
  showToast('Theme set to iOS Dark Mode');
}

function focusAppSearch() {
  openApp('clients');
}

// Toast Popup
function showToast(message) {
  const toast = document.getElementById('toastMessage');
  const toastText = document.getElementById('toastText');
  if (!toast || !toastText) return;

  toastText.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 2400);
}

// ==========================================================================
// PWA SERVICE WORKER & CHROME DIRECT INSTALL
// ==========================================================================

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(err => console.log('SW error:', err));
  });
}

let deferredPwaPrompt = null;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPwaPrompt = e;
});

function triggerPwaInstall() {
  if (deferredPwaPrompt) {
    deferredPwaPrompt.prompt();
    deferredPwaPrompt.userChoice.then(() => { deferredPwaPrompt = null; });
  } else {
    openModal("Install App on Phone", "Direct Home Screen Installation", "fa-mobile-screen", `
      <div style="background: #000; color: #fff; border-radius: 14px; padding: 14px; margin-bottom: 12px;">
        <strong style="display: block; margin-bottom: 6px; color: #38bdf8;">Google Chrome (Android):</strong>
        <p style="font-size: 11.5px; line-height: 1.5; color: #e2e8f0;">
          Chrome માં ઉપર જમણી બાજુના <strong>3 ડૉટ્સ (⋮)</strong> પર ક્લિક કરો અને <strong>"Install app"</strong> અથવા <strong>"Add to Home screen"</strong> પર ટેપ કરો.
        </p>
      </div>
      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 14px; padding: 14px;">
        <strong style="display: block; margin-bottom: 6px;">iPhone (Safari):</strong>
        <p style="font-size: 11.5px; line-height: 1.5; color: #64748b;">
          Safari માં નીચે <strong>Share</strong> બટન પર ટેપ કરો અને <strong>"Add to Home Screen"</strong> પસંદ કરો.
        </p>
      </div>
    `);
  }
}
