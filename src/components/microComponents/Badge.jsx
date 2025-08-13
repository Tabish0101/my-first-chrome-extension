import { Building2, GraduationCap, User, HelpCircle } from "lucide-react"

const categoryConfig = {
  person: {
    label: "Person",
    icon: User,
    color: "bg-emerald-100 text-emerald-600",
    hoverColor: "hover:bg-emerald-100",
  },
  company: {
    label: "Company",
    icon: Building2,
    color: "bg-blue-100 text-blue-600",
    hoverColor: "hover:bg-blue-100",
  },
  school: {
    label: "School",
    icon: GraduationCap,
    color: "bg-purple-100 text-purple-600",
    hoverColor: "hover:bg-purple-100",
  },
  other: {
    label: "Other",
    icon: HelpCircle,
    color: "bg-slate-100 text-slate-600",
    hoverColor: "hover:bg-slate-100",
  },
}

export function CategoryBadge({ category }) {
  const config = categoryConfig[category.toLowerCase()]
  const Icon = config.icon

  return (
    <span
      className={
        `inline-flex items-center justify-center h-4 w-4 p-0 rounded-full text-xs font-medium transition-colors ` +
        `${config.color} ${config.hoverColor}`
      }
      title={category}
    >
      <Icon strokeWidth={1} className="w-3 h-3" />
    </span>
  )
}
