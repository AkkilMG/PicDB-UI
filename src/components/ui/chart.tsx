"use client"

import type * as React from "react"
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Tooltip,
  Legend,
  type LegendProps,
} from "recharts"

interface ChartProps {
  children: React.ReactNode
  className?: string
}

export function Chart({ children, className }: ChartProps) {
  return <div className={className}>{children}</div>
}

interface ChartContainerProps {
  children: React.ReactElement
}

export function ChartContainer({ children }: ChartContainerProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      {children}
    </ResponsiveContainer>
  )
}

interface ChartPieProps {
  data: any[]
  dataKey: string
  nameKey: string
  innerRadius: number
  outerRadius: number
  paddingAngle: number
}

export function ChartPie({
  data,
  dataKey,
  nameKey,
  innerRadius,
  outerRadius,
  paddingAngle,
}: ChartPieProps) {
  return (
    <PieChart>
      <Pie
        data={data}
        dataKey={dataKey}
        nameKey={nameKey}
        cx="50%"
        cy="50%"
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        paddingAngle={paddingAngle}
        fill="#8884d8"
      />
      <ChartTooltip />
      <ChartLegend />
    </PieChart>
  )
}

export function ChartTooltip() {
  return <Tooltip />
}

interface ChartLegendProps {
  children?: React.ReactNode
}

export function ChartLegend({ children }: ChartLegendProps) {
  return <Legend content={renderLegend as any} />
}

interface ChartLegendItemProps {
  color: string
  name: string
}

export function ChartLegendItem({ color, name }: ChartLegendItemProps) {
  return (
    <div className="flex items-center space-x-2">
      <span
        className="block h-2 w-2 rounded-full"
        style={{ backgroundColor: color }}
      />
      <span>{name}</span>
    </div>
  )
}

const renderLegend = (props: LegendProps): React.ReactNode => {
  const { payload } = props
  if (!payload) return null

  return (
    <div className="flex flex-col">
      {payload.map((entry: any, index: number) => (
        <ChartLegendItem
          key={`item-${index}`}
          color={entry.color}
          name={entry.value}
        />
      ))}
    </div>
  )
}
