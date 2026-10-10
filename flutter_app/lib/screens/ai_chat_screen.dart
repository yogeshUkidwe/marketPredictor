import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../framework/theme.dart';
import '../framework/components/astro_card.dart';
import '../framework/components/metric_badge.dart';
import '../framework/components/astro_button.dart';
import '../framework/app_state.dart';
import '../models/chat_message.dart';

class AiChatScreen extends StatefulWidget {
  const AiChatScreen({super.key});

  @override
  State<AiChatScreen> createState() => _AiChatScreenState();
}

class _AiChatScreenState extends State<AiChatScreen> {
  final TextEditingController _textController = TextEditingController();
  final ScrollController _scrollController = ScrollController();

  final List<String> _quickPrompts = [
    'Add TCS in watchlist',
    'Add Reliance to watchlist',
    'Add Suzlon to watchlist',
    'Why is TCS predicted target ₹2,095 today?',
    'What is the planetary alignment for Nifty today?',
  ];

  void _sendMessage(AstroQuantAppState state, [String? customText]) {
    final text = customText ?? _textController.text;
    if (text.trim().isEmpty) return;

    state.sendChatMessage(text.trim());
    if (customText == null) _textController.clear();

    Future.delayed(const Duration(milliseconds: 300), () {
      if (_scrollController.hasClients) {
        _scrollController.animateTo(
          _scrollController.position.maxScrollExtent,
          duration: const Duration(milliseconds: 300),
          curve: Curves.easeOut,
        );
      }
    });
  }

  @override
  void dispose() {
    _textController.dispose();
    _scrollController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final state = context.watch<AstroQuantAppState>();
    final messages = state.chatMessages;

    return Scaffold(
      backgroundColor: Colors.transparent,
      body: SafeArea(
        child: Column(
          children: [
            // Top Bar
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
              child: Row(
                children: [
                  Container(
                    padding: const EdgeInsets.all(8),
                    decoration: BoxDecoration(
                      color: AstroQuantTheme.cyanAccent.withOpacity(0.18),
                      borderRadius: BorderRadius.circular(10),
                      border: Border.all(color: AstroQuantTheme.cyanAccent.withOpacity(0.4)),
                    ),
                    child: const Icon(Icons.smart_toy_outlined, color: AstroQuantTheme.cyanGlow, size: 20),
                  ),
                  const SizedBox(width: 10),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: const [
                        Text(
                          'Chief AI Market Expert & Astro Quant',
                          style: TextStyle(fontSize: 14, fontWeight: FontWeight.w900, color: Colors.white),
                        ),
                        Text(
                          'Natural Language Watchlist Commands & 08-10-2026 Target Analysis',
                          style: TextStyle(fontSize: 10, color: Colors.white54),
                        ),
                      ],
                    ),
                  ),
                  MetricBadge(label: 'Live Bot', color: AstroQuantTheme.emeraldBullish),
                ],
              ),
            ),
            const Divider(height: 1, color: AstroQuantTheme.borderSubtle),

            // Quick Prompt Chips
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
              color: const Color(0xFF070D1A),
              child: SingleChildScrollView(
                scrollDirection: Axis.horizontal,
                child: Row(
                  children: _quickPrompts.map((prompt) {
                    final isAdd = prompt.toLowerCase().contains('add');

                    return Padding(
                      padding: const EdgeInsets.only(right: 8),
                      child: ActionChip(
                        avatar: Icon(
                          isAdd ? Icons.add_circle_outline : Icons.auto_awesome,
                          size: 14,
                          color: isAdd ? AstroQuantTheme.amberAccent : AstroQuantTheme.cyanAccent,
                        ),
                        label: Text(prompt),
                        onPressed: () => _sendMessage(state, prompt),
                        backgroundColor: AstroQuantTheme.cardBg,
                        side: BorderSide(
                          color: isAdd ? AstroQuantTheme.amberAccent.withOpacity(0.4) : AstroQuantTheme.borderSubtle,
                        ),
                        labelStyle: TextStyle(
                          fontSize: 10,
                          fontWeight: FontWeight.w600,
                          color: isAdd ? AstroQuantTheme.amberAccent : Colors.white70,
                        ),
                      ),
                    );
                  }).toList(),
                ),
              ),
            ),
            const Divider(height: 1, color: AstroQuantTheme.borderSubtle),

            // Messages Stream
            Expanded(
              child: ListView.builder(
                controller: _scrollController,
                padding: const EdgeInsets.all(16),
                itemCount: messages.length,
                itemBuilder: (context, index) {
                  final msg = messages[index];
                  return _buildMessageBubble(context, state, msg);
                },
              ),
            ),

            if (state.isChatLoading) ...[
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
                child: Row(
                  children: const [
                    SizedBox(width: 14, height: 14, child: CircularProgressIndicator(strokeWidth: 2, color: AstroQuantTheme.cyanAccent)),
                    SizedBox(width: 8),
                    Text('Chief AI Quant synthesizing market & astro data...', style: TextStyle(fontSize: 10, color: Colors.white54)),
                  ],
                ),
              ),
            ],

            // Input Bar
            Container(
              padding: const EdgeInsets.all(12),
              decoration: const BoxDecoration(
                color: AstroQuantTheme.surfaceBg,
                border: Border(top: BorderSide(color: AstroQuantTheme.borderSubtle)),
              ),
              child: Row(
                children: [
                  Expanded(
                    child: TextField(
                      controller: _textController,
                      style: const TextStyle(fontSize: 13, color: Colors.white),
                      decoration: const InputDecoration(
                        hintText: 'Tell me to "Add TCS in watchlist" or ask for predictions...',
                        contentPadding: EdgeInsets.symmetric(horizontal: 14, vertical: 10),
                      ),
                      onSubmitted: (_) => _sendMessage(state),
                    ),
                  ),
                  const SizedBox(width: 8),
                  AstroButton(
                    onPressed: () => _sendMessage(state),
                    icon: Icons.send,
                    label: 'Ask Bot',
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildMessageBubble(BuildContext context, AstroQuantAppState state, ChatMessage msg) {
    final isUser = msg.isUser;

    return Padding(
      padding: const EdgeInsets.only(bottom: 14),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisAlignment: isUser ? MainAxisAlignment.end : MainAxisAlignment.start,
        children: [
          if (!isUser) ...[
            CircleAvatar(
              radius: 14,
              backgroundColor: AstroQuantTheme.cyanAccent.withOpacity(0.2),
              child: const Icon(Icons.blur_on, size: 16, color: AstroQuantTheme.cyanGlow),
            ),
            const SizedBox(width: 8),
          ],
          Flexible(
            child: Container(
              padding: const EdgeInsets.all(14),
              decoration: BoxDecoration(
                color: isUser ? AstroQuantTheme.indigoAccent.withOpacity(0.25) : AstroQuantTheme.cardBg,
                borderRadius: BorderRadius.circular(14),
                border: Border.all(
                  color: isUser
                      ? AstroQuantTheme.indigoAccent.withOpacity(0.5)
                      : (msg.actionBadge != null
                          ? AstroQuantTheme.amberAccent.withOpacity(0.5)
                          : AstroQuantTheme.borderSubtle),
                ),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Action Badge if Watchlist Command Executed
                  if (msg.actionBadge != null) ...[
                    Container(
                      margin: const EdgeInsets.only(bottom: 10),
                      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                      decoration: BoxDecoration(
                        color: AstroQuantTheme.amberAccent.withOpacity(0.18),
                        borderRadius: BorderRadius.circular(8),
                        border: Border.all(color: AstroQuantTheme.amberAccent.withOpacity(0.5)),
                      ),
                      child: Row(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          const Icon(Icons.star, size: 14, color: AstroQuantTheme.amberAccent),
                          const SizedBox(width: 6),
                          Text(
                            msg.actionBadge!,
                            style: const TextStyle(fontSize: 11, fontWeight: FontWeight.w800, color: AstroQuantTheme.amberAccent),
                          ),
                        ],
                      ),
                    ),
                  ],

                  Text(
                    msg.text,
                    style: const TextStyle(fontSize: 12.5, color: Colors.white, height: 1.4),
                  ),

                  // If Stock linked, provide quick button to view in terminal
                  if (msg.targetStockSymbol != null && !isUser) ...[
                    const SizedBox(height: 10),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.end,
                      children: [
                        TextButton.icon(
                          onPressed: () {
                            final matched = state.stocks.firstWhere(
                              (s) => s.symbol == msg.targetStockSymbol,
                              orElse: () => state.stocks.first,
                            );
                            state.selectStock(matched);
                            state.setIndex(0); // Jump to terminal
                          },
                          icon: const Icon(Icons.arrow_forward, size: 14, color: AstroQuantTheme.cyanAccent),
                          label: Text(
                            'View ${msg.targetStockSymbol} in Terminal',
                            style: const TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: AstroQuantTheme.cyanAccent),
                          ),
                        ),
                      ],
                    ),
                  ],
                ],
              ),
            ),
          ),
          if (isUser) ...[
            const SizedBox(width: 8),
            CircleAvatar(
              radius: 14,
              backgroundColor: AstroQuantTheme.indigoAccent.withOpacity(0.3),
              child: const Icon(Icons.person, size: 16, color: Colors.white),
            ),
          ],
        ],
      ),
    );
  }
}
