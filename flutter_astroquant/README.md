# Flutter AstroQuant — Real-Time Indian & Global Market Terminal

Production-grade, Clean Architecture Flutter implementation of the AstroQuant Financial Quantitative & Vedic Astrological Stock Intelligence Platform.

## 🚀 Architecture Highlights

- **Clean Architecture**: Decoupled `core`, `data`, `domain`, and `presentation` layers.
- **Reusable Framework Components**: Modular UI widgets (`LiveTickerTape`, `InteractiveStockChart`, `PredictedTargetHero`, `AstroProfileCard`, `QuantTechnicalsCard`, `MacroDependencyWeb`, `WatchlistSidebar`, `StockSearchModal`, `AiMarketExpertChatModal`).
- **High-Frequency Live Ticker Stream**: Real-time SSE / REST stream client connecting to `/api/stream-ticker` and `/api/ticker` with sub-second micro-tick updates, direction indicators, and locked pre-market target validation for **08-10-2026**.
- **Astrological & Quant Engines**: Full client-side mathematical models for Vedic planetary transits (9 Navagrahas), Gann cycles, 14-period RSI, MACD, and pivot points.
- **Cross-Platform**: Ready for iOS, Android, macOS, Windows, and Flutter Web.

## 📁 Repository Structure

```
flutter_astroquant/
├── lib/
│   ├── main.dart
│   ├── app.dart
│   ├── core/
│   │   ├── theme/astro_theme.dart
│   │   ├── network/api_client.dart
│   │   ├── network/ticker_stream_client.dart
│   │   ├── constants/market_constants.dart
│   │   └── engine/astro_quant_engine.dart
│   ├── data/
│   │   ├── models/stock_model.dart
│   │   ├── models/ticker_model.dart
│   │   ├── datasources/stock_remote_datasource.dart
│   │   └── repositories/stock_repository_impl.dart
│   ├── domain/
│   │   ├── entities/stock_entity.dart
│   │   ├── repositories/stock_repository.dart
│   │   └── usecases/get_live_ticker_stream_usecase.dart
│   └── presentation/
│       ├── providers/ticker_stream_provider.dart
│       ├── providers/stock_provider.dart
│       ├── framework_components/
│       │   ├── live_ticker_tape_widget.dart
│       │   ├── interactive_stock_chart_widget.dart
│       │   ├── predicted_target_hero_widget.dart
│       │   ├── astro_profile_card_widget.dart
│       │   ├── quant_technicals_card_widget.dart
│       │   ├── macro_dependency_web_widget.dart
│       │   ├── watchlist_sidebar_widget.dart
│       │   ├── stock_search_modal_widget.dart
│       │   └── ai_market_expert_chat_modal_widget.dart
│       └── screens/
│           ├── terminal_home_screen.dart
│           └── stock_detail_screen.dart
```

## 🛠️ How to Run

1. Make sure Flutter SDK (>=3.0.0) is installed.
2. In the `flutter_astroquant` directory:
   ```bash
   flutter pub get
   ```
3. Run on Chrome (Web):
   ```bash
   flutter run -d chrome
   ```
4. Run on Android or iOS:
   ```bash
   flutter run -d android
   # or
   flutter run -d ios
   ```
5. Build release APK or Web bundle:
   ```bash
   flutter build web --release
   flutter build apk --release
   ```
