import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';
import { ActivityType } from '../types';

interface IconProps {
  size?: number;
  color?: string;
}

const strokeProps = (color: string, size: number) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none' as const,
  stroke: color,
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
});

export function PinIcon({ size = 16, color = '#8A4A63' }: IconProps) {
  return (
    <Svg {...strokeProps(color, size)}>
      <Path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <Circle cx={12} cy={10} r={3} />
    </Svg>
  );
}

export function FilterIcon({ size = 18, color = '#4A1942' }: IconProps) {
  return (
    <Svg {...strokeProps(color, size)}>
      <Path d="M4 6h16M7 12h10M10 18h4" />
    </Svg>
  );
}

export function CloseIcon({ size = 18, color = '#2B1620' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.4} strokeLinecap="round">
      <Path d="M18 6 6 18M6 6l12 12" />
    </Svg>
  );
}

export function InfoIcon({ size = 18, color = '#4A1942' }: IconProps) {
  return (
    <Svg {...strokeProps(color, size)}>
      <Circle cx={12} cy={12} r={9} />
      <Path d="M12 11v5" />
      <Circle cx={12} cy={8} r={0.6} fill={color} />
    </Svg>
  );
}

export function HeartIcon({ size = 18, color = '#2B1620', filled = true }: IconProps & { filled?: boolean }) {
  const d = 'M12 21s-7.5-4.6-10-9.3C.6 8.4 2.4 5 6 5c2 0 3.6 1.1 4.4 2.6C11.2 6.1 12.8 5 14.8 5c3.6 0 5.4 3.4 4 6.7C19.5 16.4 12 21 12 21Z';
  return filled ? (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke="none">
      <Path d={d} />
    </Svg>
  ) : (
    <Svg {...strokeProps(color, size)}>
      <Path d={d} />
    </Svg>
  );
}

export function BackIcon({ size = 16, color = '#2B1620' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M15 18l-6-6 6-6" />
    </Svg>
  );
}

export function ShareIcon({ size = 15, color = '#2B1620' }: IconProps) {
  return (
    <Svg {...strokeProps(color, size)}>
      <Circle cx={18} cy={5} r={2.5} />
      <Circle cx={6} cy={12} r={2.5} />
      <Circle cx={18} cy={19} r={2.5} />
      <Path d="m8.2 10.7 7.6-4.4M8.2 13.3l7.6 4.4" />
    </Svg>
  );
}

export function HomeTabIcon({ size = 20, color = '#B79AA8' }: IconProps) {
  return (
    <Svg {...strokeProps(color, size)}>
      <Path d="M3 10.5 12 3l9 7.5" />
      <Path d="M5 9v11h14V9" />
    </Svg>
  );
}

export function JarIcon({ size = 20, color = '#B79AA8' }: IconProps) {
  return (
    <Svg {...strokeProps(color, size)}>
      <Path d="M7 8V6a5 5 0 0 1 10 0v2" />
      <Path d="M4 8h16l-1.2 11.2a2 2 0 0 1-2 1.8H7.2a2 2 0 0 1-2-1.8L4 8Z" />
      <Path d="M9 12v3M15 12v3" />
    </Svg>
  );
}

export function SparkleIcon({ size = 20, color = '#B79AA8' }: IconProps) {
  return (
    <Svg {...strokeProps(color, size)}>
      <Path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" />
      <Circle cx={12} cy={12} r={4} />
    </Svg>
  );
}

export function EmberFlameIcon({ size = 40, color = '#2B1620' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke="none">
      <Path d="M12 2c1 4-3 5-3 9a3 3 0 0 0 6 0c0-1-.5-1.6-.5-1.6s2.5 1.6 2.5 5.1a5 5 0 0 1-10 0C7 9 12 8 12 2Z" />
    </Svg>
  );
}

// One line-art glyph per activity type — reused on cards, rows, and the
// detail hero so every surface identifies a category the same way.
export function ActivityIcon({ type, size = 24, color = '#FBF6F3' }: IconProps & { type: ActivityType }) {
  const p = strokeProps(color, size);
  switch (type) {
    case 'food':
      return (
        <Svg {...p}>
          <Path d="M7 2v7a2 2 0 0 0 2 2v11" />
          <Path d="M7 2v20" />
          <Path d="M4 2v7a2 2 0 0 0 2 2" />
          <Path d="M17 2c-2 2-2 6-2 9 0 3 1 4 3 4v7" />
        </Svg>
      );
    case 'outdoor':
      return (
        <Svg {...p}>
          <Path d="m8 3 4 8 5-5 5 15H2L8 3z" />
        </Svg>
      );
    case 'indoor':
      return (
        <Svg {...p}>
          <Path d="M3 10.5 12 3l9 7.5" />
          <Path d="M5 9v11h14V9" />
          <Path d="M9 20v-6h6v6" />
        </Svg>
      );
    case 'adventure':
      return (
        <Svg {...p}>
          <Path d="M12 2 3 21h18L12 2z" />
          <Path d="m10 13 2-3 2 3" />
        </Svg>
      );
    case 'culture':
      return (
        <Svg {...p}>
          <Circle cx={12} cy={12} r={9} />
          <Circle cx={9} cy={10} r={1.2} fill={color} />
          <Circle cx={14} cy={8.5} r={1} fill={color} />
          <Circle cx={15.5} cy={13} r={1.2} fill={color} />
        </Svg>
      );
    case 'relaxation':
      return (
        <Svg {...p}>
          <Path d="M4 18c2-6 6-9 8-9s6 3 8 9" />
          <Path d="M2 18h20" />
          <Circle cx={12} cy={6} r={2} />
        </Svg>
      );
  }
}
