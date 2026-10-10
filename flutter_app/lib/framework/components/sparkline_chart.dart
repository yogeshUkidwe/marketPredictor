import 'dart:ui' as ui;
import 'package:flutter/material.dart';
import '../theme.dart';

/// Lightweight Custom Canvas Intraday Sparkline Chart
class SparklineChart extends StatelessWidget {
  final List<double> points;
  final double? targetPrice;
  final Color? lineColor;
  final double height;

  const SparklineChart({
    super.key,
    required this.points,
    this.targetPrice,
    this.lineColor,
    this.height = 120.0,
  });

  @override
  Widget build(BuildContext context) {
    if (points.isEmpty) {
      return SizedBox(
        height: height,
        child: const Center(
          child: Text('Awaiting Tick Sequence...', style: TextStyle(color: Colors.white30, fontSize: 11)),
        ),
      );
    }

    final isBullish = points.last >= points.first;
    final color = lineColor ?? (isBullish ? AstroQuantTheme.emeraldBullish : AstroQuantTheme.roseBearish);

    return SizedBox(
      height: height,
      width: double.infinity,
      child: CustomPaint(
        painter: _SparklinePainter(
          points: points,
          targetPrice: targetPrice,
          color: color,
        ),
      ),
    );
  }
}

class _SparklinePainter extends CustomPainter {
  final List<double> points;
  final double? targetPrice;
  final Color color;

  _SparklinePainter({
    required this.points,
    this.targetPrice,
    required this.color,
  });

  @override
  void paint(Canvas canvas, Size size) {
    if (points.length < 2) return;

    var minVal = points.reduce((curr, next) => curr < next ? curr : next);
    var maxVal = points.reduce((curr, next) => curr > next ? curr : next);

    if (targetPrice != null) {
      if (targetPrice! < minVal) minVal = targetPrice!;
      if (targetPrice! > maxVal) maxVal = targetPrice!;
    }

    final range = maxVal - minVal == 0 ? 1.0 : maxVal - minVal;
    final paddingY = size.height * 0.12;
    final usableHeight = size.height - (paddingY * 2);

    final path = Path();
    final fillPath = Path();

    final stepX = size.width / (points.length - 1);

    for (int i = 0; i < points.length; i++) {
      final x = i * stepX;
      final normalized = (points[i] - minVal) / range;
      final y = size.height - paddingY - (normalized * usableHeight);

      if (i == 0) {
        path.moveTo(x, y);
        fillPath.moveTo(x, size.height);
        fillPath.lineTo(x, y);
      } else {
        path.lineTo(x, y);
        fillPath.lineTo(x, y);
      }
    }

    fillPath.lineTo(size.width, size.height);
    fillPath.close();

    // Gradient Area Fill
    final fillPaint = Paint()
      ..shader = ui.Gradient.linear(
        Offset(0, paddingY),
        Offset(0, size.height),
        [color.withOpacity(0.25), color.withOpacity(0.0)],
      )
      ..style = PaintingStyle.fill;
    canvas.drawPath(fillPath, fillPaint);

    // Stroke Line
    final strokePaint = Paint()
      ..color = color
      ..strokeWidth = 2.2
      ..style = PaintingStyle.stroke
      ..strokeCap = StrokeCap.round
      ..strokeJoin = StrokeJoin.round;
    canvas.drawPath(path, strokePaint);

    // Target Dotted Line (if targetPrice specified)
    if (targetPrice != null) {
      final normalizedTarget = (targetPrice! - minVal) / range;
      final targetY = size.height - paddingY - (normalizedTarget * usableHeight);

      final targetPaint = Paint()
        ..color = AstroQuantTheme.amberAccent.withOpacity(0.7)
        ..strokeWidth = 1.2
        ..style = PaintingStyle.stroke;

      const dashWidth = 4.0;
      const dashSpace = 4.0;
      double startX = 0;
      while (startX < size.width) {
        canvas.drawLine(
          Offset(startX, targetY),
          Offset(startX + dashWidth, targetY),
          targetPaint,
        );
        startX += dashWidth + dashSpace;
      }
    }

    // Glowing Pulse Head at Last Point
    final lastNormalized = (points.last - minVal) / range;
    final lastY = size.height - paddingY - (lastNormalized * usableHeight);
    final headOffset = Offset(size.width, lastY);

    canvas.drawCircle(
      headOffset,
      5.0,
      Paint()..color = color.withOpacity(0.35),
    );
    canvas.drawCircle(
      headOffset,
      2.5,
      Paint()..color = Colors.white,
    );
  }

  @override
  bool shouldRepaint(covariant _SparklinePainter oldDelegate) => true;
}
