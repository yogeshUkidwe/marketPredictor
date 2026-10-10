import 'package:flutter/material.dart';
import '../theme.dart';

/// Reusable Glowing Astro Action Button
class AstroButton extends StatelessWidget {
  final VoidCallback onPressed;
  final Widget? child;
  final String? label;
  final IconData? icon;
  final Color? color;
  final bool isOutlined;
  final bool isFullWidth;
  final EdgeInsetsGeometry padding;

  const AstroButton({
    super.key,
    required this.onPressed,
    this.child,
    this.label,
    this.icon,
    this.color,
    this.isOutlined = false,
    this.isFullWidth = false,
    this.padding = const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
  });

  @override
  Widget build(BuildContext context) {
    final baseColor = color ?? AstroQuantTheme.cyanAccent;

    final content = Row(
      mainAxisSize: isFullWidth ? MainAxisSize.max : MainAxisSize.min,
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        if (icon != null) ...[
          Icon(icon, size: 16, color: isOutlined ? baseColor : Colors.black),
          const SizedBox(width: 8),
        ],
        if (child != null)
          child!
        else if (label != null)
          Text(
            label!,
            style: TextStyle(
              fontSize: 12,
              fontWeight: FontWeight.w800,
              letterSpacing: 0.2,
              color: isOutlined ? baseColor : Colors.black,
            ),
          ),
      ],
    );

    if (isOutlined) {
      return OutlinedButton(
        onPressed: onPressed,
        style: OutlinedButton.styleFrom(
          padding: padding,
          side: BorderSide(color: baseColor.withOpacity(0.5)),
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
          backgroundColor: baseColor.withOpacity(0.08),
        ),
        child: content,
      );
    }

    return ElevatedButton(
      onPressed: onPressed,
      style: ElevatedButton.styleFrom(
        padding: padding,
        backgroundColor: baseColor,
        elevation: 0,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
        shadowColor: baseColor.withOpacity(0.4),
      ),
      child: content,
    );
  }
}
