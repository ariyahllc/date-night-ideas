import React from 'react';
import { Pressable, Text, StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../theme/ThemeProvider';

type Variant = 'primary' | 'secondary' | 'ghost';

interface Props {
  label: string;
  onPress?: () => void;
  variant?: Variant;
  style?: ViewStyle;
  disabled?: boolean;
}

export function Button({ label, onPress, variant = 'primary', style, disabled }: Props) {
  const { colors, radii } = useTheme();

  const content = (
    <Text
      style={[
        styles.label,
        variant === 'primary' && { color: '#2B1620' },
        variant === 'secondary' && { color: '#FBF6F3' },
        variant === 'ghost' && { color: colors.plum700 },
      ]}
    >
      {label}
    </Text>
  );

  if (variant === 'primary') {
    return (
      <Pressable onPress={onPress} disabled={disabled} style={({ pressed }) => [pressed && styles.pressed, style]}>
        <LinearGradient
          colors={[colors.gold500, colors.coral500]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.btn, { borderRadius: radii.button }, disabled && styles.disabled]}
        >
          {content}
        </LinearGradient>
      </Pressable>
    );
  }

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.btn,
        { borderRadius: radii.button },
        variant === 'secondary' && { backgroundColor: colors.plum700 },
        variant === 'ghost' && { backgroundColor: 'transparent', borderWidth: 1.5, borderColor: colors.border },
        pressed && styles.pressed,
        disabled && styles.disabled,
        style,
      ]}
    >
      {content}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    height: 52,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  label: {
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: -0.2,
  },
  pressed: { opacity: 0.85 },
  disabled: { opacity: 0.5 },
});
