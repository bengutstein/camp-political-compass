import { quizConfig } from "@/config/quizConfig";

export function CompassChart({ x, y, showTooltip = true }: { x: number; y: number; showTooltip?: boolean }) {
  const size = 600, pad = 68, chart = size - pad * 2;
  const pointX = pad + ((x + 10) / 20) * chart;
  const pointY = pad + ((10 - y) / 20) * chart;
  const ticks = [-10, -5, 0, 5, 10];
  const minor = [-8, -6, -4, -2, 2, 4, 6, 8];
  const q = quizConfig.quadrants;
  const toX = (value: number) => pad + ((value + 10) / 20) * chart;
  const toY = (value: number) => pad + ((10 - value) / 20) * chart;
  return <div className="w-full"><svg viewBox={`0 0 ${size} ${size}`} role="img" aria-label={`Compass chart: your result is x ${x}, y ${y}`} className="h-auto w-full overflow-visible">
    <rect x={pad} y={pad} width={chart / 2} height={chart / 2} fill={q["upper-left"].color} opacity=".72" /><rect x={pad + chart / 2} y={pad} width={chart / 2} height={chart / 2} fill={q["upper-right"].color} opacity=".72" /><rect x={pad} y={pad + chart / 2} width={chart / 2} height={chart / 2} fill={q["lower-left"].color} opacity=".72" /><rect x={pad + chart / 2} y={pad + chart / 2} width={chart / 2} height={chart / 2} fill={q["lower-right"].color} opacity=".72" />
    {minor.map((value) => <g key={value}><line x1={toX(value)} x2={toX(value)} y1={pad} y2={size - pad} stroke="#ffffff" strokeOpacity=".5" /><line x1={pad} x2={size - pad} y1={toY(value)} y2={toY(value)} stroke="#ffffff" strokeOpacity=".5" /></g>)}
    {ticks.map((value) => <g key={value}><line x1={toX(value)} x2={toX(value)} y1={pad} y2={size - pad} stroke="#18211e" strokeOpacity={value === 0 ? ".85" : ".28"} strokeWidth={value === 0 ? "2" : "1"} /><line x1={pad} x2={size - pad} y1={toY(value)} y2={toY(value)} stroke="#18211e" strokeOpacity={value === 0 ? ".85" : ".28"} strokeWidth={value === 0 ? "2" : "1"} /><text x={toX(value)} y={size - pad + 22} textAnchor="middle" fontSize="12" fill="#52605a">{value}</text><text x={pad - 16} y={toY(value) + 4} textAnchor="end" fontSize="12" fill="#52605a">{value}</text></g>)}
    <rect x={pad} y={pad} width={chart} height={chart} fill="none" stroke="#18211e" strokeOpacity=".7" />
    <text x={size / 2} y={size - 16} textAnchor="middle" fontSize="13" fontWeight="700" fill="#18211e">{quizConfig.xAxis.title}</text><text x="18" y={size / 2} textAnchor="middle" transform={`rotate(-90 18 ${size / 2})`} fontSize="13" fontWeight="700" fill="#18211e">{quizConfig.yAxis.title}</text>
    <text x={pad + 12} y={pad + 22} fontSize="11" fontWeight="700" letterSpacing="1.1" fill="#b91c1c">{q["upper-left"].name.toUpperCase()}</text><text x={size - pad - 12} y={pad + 22} textAnchor="end" fontSize="11" fontWeight="700" letterSpacing="1.1" fill="#b91c1c">{q["upper-right"].name.toUpperCase()}</text>
    <text x={pad + 12} y={size - pad - 12} fontSize="11" fontWeight="700" letterSpacing="1.1" fill="#b91c1c">{q["lower-left"].name.toUpperCase()}</text><text x={size - pad - 12} y={size - pad - 12} textAnchor="end" fontSize="11" fontWeight="700" letterSpacing="1.1" fill="#b91c1c">{q["lower-right"].name.toUpperCase()}</text>
    <g className="point-in"><circle cx={pointX} cy={pointY} r="13" fill="#18211e" stroke="#fff" strokeWidth="4" />{showTooltip && <g><rect x={pointX + 17} y={pointY - 33} width="91" height="25" rx="2" fill="#18211e" /><text x={pointX + 62} y={pointY - 16} textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">You are here</text></g>}</g>
  </svg></div>;
}
