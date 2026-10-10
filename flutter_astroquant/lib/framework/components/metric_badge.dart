import 'package:flutter/material.dart';
import '../theme.dart';

enum BadgeTrend { bullish, bearish, neutral }

/// Reusable Metric & Status Badge
class MetricBadge extends StatelessWidget {
  final String label;
  final String? value;
  final IconData? icon;
  final Color? color;
  final bool isMonospace;

  const MetricBadge({
    super.key,
    required this.label,
    this.value,
    this.icon,
    this.color,
    this.isMonospace = false,
  });

  @override
  Widget build(BuildContext context) {
    final baseColor = color ?? AstroQuantTheme.cyanAccent;

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
      decoration: BoxDecoration(
        color: baseColor.withOpacity(0.12),
        borderRadius: BorderRadius.circular(8),
        border: Border.all(color: baseColor.withOpacity(0.35), width: 1),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          if (icon != null) ...[
            Icon(icon, size: 12, color: baseColor),
            const SizedBox(width: 4),
          ],
          Text(
            label,
            style: TextStyle(
              fontSize: 10,
              fontWeight: FontWeight.w600,
              color: baseColor,
              fontFamily: isMonospace ? 'monospace' : null,
            ),
          ),
          if (value != null) ...[
            const SizedBox(width: 4),
            Text(
              value!,
              style: TextStyle(
                fontSize: 11,
                fontWeight: FontWeight.w800,
                color: Colors.white,
                fontFamily: isMonospace ? 'monospace' : null,
              ),
            ),
          ],
        ],
      ),
    );
  }
}

/// Dynamic Bullish / Bearish Change Pill
class TrendBadge extends StatelessWidget {
  final double change;
  final double changePercent;
  final String currency;

  const TrendBadge({
    super.key,
    required this.change,
    required this.changePercent,
    this.currency = '₹',
  });

  @override
  Widget build(BuildContext context) {
    final isBullish = change >= 0;
    final color = isBullish ? AstroQuantTheme.emeraldBullish : AstroQuantTheme.roseBearish;
    final sign = isBullish ? '+' : '';

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
      decoration: BoxDecoration(
        color: color.withOpacity(0.15),
        borderRadius: BorderRadius.circular(6),
        border: Border.all(color: color.withOpacity(0.4)),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(
            isBullish ? Icons.arrow_drop_up : Icons.arrow_drop_down,
            size: 16,
            color: color,
          ),
          Text(
            '$sign${change.toStringAsFixed(2)} ($sign${changePercent.toStringAsFixed(2)}%)',
            style: TextStyle(
              fontSize: 11,
              fontWeight: FontWeight.w700,
              color: color,
              fontFamily: 'monospace',
            ),
          ),
        ],
      ),
    );
  }
}
