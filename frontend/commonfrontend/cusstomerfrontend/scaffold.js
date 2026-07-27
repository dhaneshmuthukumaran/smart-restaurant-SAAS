/**
 * scaffold.js
 * Creates the full frontend project folder/file structure in one run.
 *
 * USAGE:
 *   1. Put this file in the root of your repo (where you want the
 *      public/, src/, tests/ folders to live).
 *   2. Open a terminal in VS Code (Ctrl+` / Cmd+`).
 *   3. Run:  node scaffold.js
 *
 * It will create every folder and empty file from the structure.
 * Existing files/folders are left untouched (safe to re-run).
 */

const fs = require("fs");
const path = require("path");

// Every file path (relative to this script). Creating these will
// also create all the parent directories automatically.
const files = [
  // public
  "public/favicon.ico",
  "public/images/brands/.gitkeep",
  "public/images/dishes/.gitkeep",
  "public/images/branches/.gitkeep",
  "public/images/icons/.gitkeep",
  "public/fonts/.gitkeep",

  // src/api
  "src/api/index.js",
  "src/api/endpoints.js",
  "src/api/auth.js",
  "src/api/restaurants.js",
  "src/api/orders.js",
  "src/api/bookings.js",
  "src/api/websocket.js",

  // src/assets
  "src/assets/styles/globals.css",
  "src/assets/styles/variables.css",
  "src/assets/styles/animations.css",
  "src/assets/themes/dark.css",
  "src/assets/themes/light.css",

  // src/components/common
  "src/components/common/Button/Button.jsx",
  "src/components/common/Button/Button.module.css",
  "src/components/common/Button/Button.test.jsx",
  "src/components/common/Card/.gitkeep",
  "src/components/common/Modal/.gitkeep",
  "src/components/common/SearchBar/.gitkeep",
  "src/components/common/RatingStars/.gitkeep",
  "src/components/common/LoadingSpinner/.gitkeep",

  // src/components/layout
  "src/components/layout/Header/Header.jsx",
  "src/components/layout/Header/Navigation.jsx",
  "src/components/layout/Header/UserMenu.jsx",
  "src/components/layout/Footer/.gitkeep",
  "src/components/layout/Sidebar/.gitkeep",
  "src/components/layout/Layout.jsx",

  // src/components/shared
  "src/components/shared/Toast/.gitkeep",
  "src/components/shared/Tooltip/.gitkeep",
  "src/components/shared/Badge/.gitkeep",

  // src/features/search
  "src/features/search/components/SearchBar.jsx",
  "src/features/search/components/FilterChips.jsx",
  "src/features/search/components/SearchResults.jsx",
  "src/features/search/components/SearchSuggestions.jsx",
  "src/features/search/hooks/useSearch.js",
  "src/features/search/hooks/useFilters.js",
  "src/features/search/services/searchService.js",
  "src/features/search/styles/Search.module.css",
  "src/features/search/index.js",

  // src/features/table-booking
  "src/features/table-booking/components/BookingCalendar.jsx",
  "src/features/table-booking/components/TimeSlots.jsx",
  "src/features/table-booking/components/PartySizeSelector.jsx",
  "src/features/table-booking/components/BookingForm.jsx",
  "src/features/table-booking/components/BookingConfirmation.jsx",
  "src/features/table-booking/hooks/useBooking.js",
  "src/features/table-booking/hooks/useAvailability.js",
  "src/features/table-booking/services/bookingService.js",
  "src/features/table-booking/styles/Booking.module.css",
  "src/features/table-booking/index.js",

  // src/features/menu
  "src/features/menu/components/MenuGrid.jsx",
  "src/features/menu/components/DishCard.jsx",
  "src/features/menu/components/CategoryFilter.jsx",
  "src/features/menu/components/DishDetails.jsx",
  "src/features/menu/components/DietaryFilters.jsx",
  "src/features/menu/hooks/useMenu.js",
  "src/features/menu/hooks/useDishFilters.js",
  "src/features/menu/services/menuService.js",
  "src/features/menu/styles/Menu.module.css",
  "src/features/menu/index.js",

  // src/features/branches
  "src/features/branches/components/BranchCard.jsx",
  "src/features/branches/components/BranchMap.jsx",
  "src/features/branches/components/BranchList.jsx",
  "src/features/branches/components/BranchFilters.jsx",
  "src/features/branches/components/BranchDetails.jsx",
  "src/features/branches/hooks/useBranches.js",
  "src/features/branches/hooks/useGeolocation.js",
  "src/features/branches/services/branchService.js",
  "src/features/branches/styles/Branches.module.css",
  "src/features/branches/index.js",

  // src/features/delivery
  "src/features/delivery/components/DeliveryCheck.jsx",
  "src/features/delivery/components/DeliveryOptions.jsx",
  "src/features/delivery/components/AddressForm.jsx",
  "src/features/delivery/components/DeliveryTracking.jsx",
  "src/features/delivery/components/EstimatedTime.jsx",
  "src/features/delivery/hooks/useDelivery.js",
  "src/features/delivery/hooks/useAddress.js",
  "src/features/delivery/services/deliveryService.js",
  "src/features/delivery/styles/Delivery.module.css",
  "src/features/delivery/index.js",

  // src/features/ratings
  "src/features/ratings/components/RatingSummary.jsx",
  "src/features/ratings/components/RatingBars.jsx",
  "src/features/ratings/components/ReviewList.jsx",
  "src/features/ratings/components/ReviewForm.jsx",
  "src/features/ratings/components/RatingFilter.jsx",
  "src/features/ratings/components/UserReview.jsx",
  "src/features/ratings/hooks/useRatings.js",
  "src/features/ratings/hooks/useReviews.js",
  "src/features/ratings/services/ratingService.js",
  "src/features/ratings/styles/Ratings.module.css",
  "src/features/ratings/index.js",

  // src/features/offers
  "src/features/offers/components/OfferCard.jsx",
  "src/features/offers/components/OfferList.jsx",
  "src/features/offers/components/OfferFilters.jsx",
  "src/features/offers/components/PromoCodeInput.jsx",
  "src/features/offers/components/LoyaltyPoints.jsx",
  "src/features/offers/hooks/useOffers.js",
  "src/features/offers/hooks/useLoyalty.js",
  "src/features/offers/services/offerService.js",
  "src/features/offers/styles/Offers.module.css",
  "src/features/offers/index.js",

  // src/features/specials
  "src/features/specials/components/SpecialsCarousel.jsx",
  "src/features/specials/components/SpecialCard.jsx",
  "src/features/specials/components/DailySpecials.jsx",
  "src/features/specials/components/BestSellerBadge.jsx",
  "src/features/specials/components/ChefSpecial.jsx",
  "src/features/specials/hooks/useSpecials.js",
  "src/features/specials/services/specialsService.js",
  "src/features/specials/styles/Specials.module.css",
  "src/features/specials/index.js",

  // src/features/challenges
  "src/features/challenges/components/ChallengeCard.jsx",
  "src/features/challenges/components/ChallengeProgress.jsx",
  "src/features/challenges/components/ChallengeList.jsx",
  "src/features/challenges/components/QuestTracker.jsx",
  "src/features/challenges/components/RewardBadge.jsx",
  "src/features/challenges/hooks/useChallenges.js",
  "src/features/challenges/hooks/useQuests.js",
  "src/features/challenges/services/challengeService.js",
  "src/features/challenges/styles/Challenges.module.css",
  "src/features/challenges/index.js",

  // src/features/customer-care
  "src/features/customer-care/components/ChatWidget.jsx",
  "src/features/customer-care/components/ContactForm.jsx",
  "src/features/customer-care/components/FAQAccordion.jsx",
  "src/features/customer-care/components/SupportOptions.jsx",
  "src/features/customer-care/components/TicketStatus.jsx",
  "src/features/customer-care/hooks/useChat.js",
  "src/features/customer-care/hooks/useSupport.js",
  "src/features/customer-care/services/supportService.js",
  "src/features/customer-care/styles/CustomerCare.module.css",
  "src/features/customer-care/index.js",

  // src/hooks (global)
  "src/hooks/useAuth.js",
  "src/hooks/useCart.js",
  "src/hooks/useNotifications.js",
  "src/hooks/useTheme.js",
  "src/hooks/useLocalStorage.js",

  // src/pages
  "src/pages/Home/Home.jsx",
  "src/pages/Home/Home.module.css",
  "src/pages/Home/Home.test.jsx",
  "src/pages/SearchResults/.gitkeep",
  "src/pages/RestaurantDetails/.gitkeep",
  "src/pages/Checkout/.gitkeep",
  "src/pages/Profile/.gitkeep",
  "src/pages/Orders/.gitkeep",
  "src/pages/Bookings/.gitkeep",
  "src/pages/Help/.gitkeep",

  // src/routes
  "src/routes/index.js",
  "src/routes/PrivateRoute.jsx",
  "src/routes/PublicRoute.jsx",
  "src/routes/routeConstants.js",

  // src/store
  "src/store/slices/authSlice.js",
  "src/store/slices/cartSlice.js",
  "src/store/slices/userSlice.js",
  "src/store/slices/restaurantSlice.js",
  "src/store/slices/uiSlice.js",
  "src/store/store.js",
  "src/store/rootReducer.js",

  // src/utils
  "src/utils/formatters.js",
  "src/utils/validators.js",
  "src/utils/helpers.js",
  "src/utils/constants.js",
  "src/utils/errorHandler.js",
  "src/utils/analytics.js",

  // src/config
  "src/config/appConfig.js",
  "src/config/apiConfig.js",
  "src/config/environment.js",

  // src/types
  "src/types/user.types.ts",
  "src/types/restaurant.types.ts",
  "src/types/order.types.ts",
  "src/types/api.types.ts",

  // src root files
  "src/App.jsx",
  "src/App.module.css",
  "src/index.js",
  "src/serviceWorker.js",

  // tests
  "tests/unit/.gitkeep",
  "tests/integration/.gitkeep",
  "tests/e2e/.gitkeep",

  // root config files
  ".env",
  ".env.example",
  ".eslintrc.js",
  ".prettierrc",
  "vite.config.js",
];

let created = 0;
let skipped = 0;

files.forEach((relativePath) => {
  const fullPath = path.join(__dirname, relativePath);
  const dir = path.dirname(fullPath);

  fs.mkdirSync(dir, { recursive: true });

  if (fs.existsSync(fullPath)) {
    skipped++;
    return;
  }

  fs.writeFileSync(fullPath, "");
  created++;
});

console.log(`✅ Done. ${created} files created, ${skipped} already existed and were skipped.`);
console.log("Folder structure is ready under:", __dirname);
