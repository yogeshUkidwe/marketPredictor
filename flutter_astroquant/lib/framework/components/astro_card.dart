import 'package:flutter/material.dart';
import '../theme.dart';

/// Reusable Cosmic Glassmorphism Card Component
class AstroCard extends StatelessWidget {
  final Widget child;
  final String? title;
  final Widget? leadingIcon;
  final Widget? trailingAction;
  final EdgeInsetsGeometry padding;
  final Color? borderColor;
  final Color? backgroundColor;
  final VoidCallback? onTap;

  const AstroCard({
    super.key,
    required this.child,
    this.title,
    this.leadingIcon,
    this.trailingAction,
    this.padding = const EdgeInsets.all(16.0),
    this.borderColor,
    this.backgroundColor,
    this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    final border = borderColor ?? AstroQuantTheme.borderSubtle;
    final bg = backgroundColor ?? AstroQuantTheme.cardBg;

    Widget cardContent = Container(
      decoration: BoxDecoration(
        color: bg,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: border, width: 1),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.35),
            blurRadius: 12,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisSize: MainAxisSize.min,
        children: [
          if (title != null || leadingIcon != null || trailingAction != null) ...[
            Padding(
              padding: const EdgeInsets.fromLTRB(16, 14, 16, 10),
              child: Row(
                children: [
                  if (leadingIcon != null) ...[
                    leadingIcon!,
                    const SizedBox(width: 8),
                  ],
                  if (title != null)
                    Expanded(
                      child: Text(
                        title!,
                        style: const TextStyle(
                          fontSize: 13,
                          fontWeight: FontWeight.w800,
                          letterSpacing: -0.2,
                          color: Colors.white,
                        ),
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                      ),
                    ),
                  if (trailingAction != null) trailingAction!,
                ],
              ),
            ),
            const Divider(height: 1, color: AstroQuantTheme.borderSubtle),
          ],
          Padding(
            padding: padding,
            child: child,
          ),
        ],
      ),
    );

    if (onTap != null) {
      return InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(16),
        child: cardContent,
      );
    }

    return cardContent;
  }
}
