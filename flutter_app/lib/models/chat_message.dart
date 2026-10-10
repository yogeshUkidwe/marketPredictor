class ChatMessage {
  final String id;
  final String text;
  final bool isUser;
  final DateTime timestamp;
  final String? actionBadge;
  final String? targetStockSymbol;
  final double? targetStockPrice;
  final double? targetStockTarget;

  const ChatMessage({
    required this.id,
    required this.text,
    required this.isUser,
    required this.timestamp,
    this.actionBadge,
    this.targetStockSymbol,
    this.targetStockPrice,
    this.targetStockTarget,
  });

  ChatMessage copyWith({
    String? id,
    String? text,
    bool? isUser,
    DateTime? timestamp,
    String? actionBadge,
    String? targetStockSymbol,
    double? targetStockPrice,
    double? targetStockTarget,
  }) {
    return ChatMessage(
      id: id ?? this.id,
      text: text ?? this.text,
      isUser: isUser ?? this.isUser,
      timestamp: timestamp ?? this.timestamp,
      actionBadge: actionBadge ?? this.actionBadge,
      targetStockSymbol: targetStockSymbol ?? this.targetStockSymbol,
      targetStockPrice: targetStockPrice ?? this.targetStockPrice,
      targetStockTarget: targetStockTarget ?? this.targetStockTarget,
    );
  }
}
