import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'framework/theme.dart';
import 'framework/responsive_layout.dart';
import 'framework/app_state.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(
    ChangeNotifierProvider(
      create: (_) => AstroQuantAppState()..initSession(),
      child: const AstroQuantFlutterApp(),
    ),
  );
}

class AstroQuantFlutterApp extends StatelessWidget {
  const AstroQuantFlutterApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'AstroQuant Predictor',
      debugShowCheckedModeBanner: false,
      theme: AstroQuantTheme.darkTheme,
      home: const AdaptiveAppShell(),
    );
  }
}
