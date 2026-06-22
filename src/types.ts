export interface NavTranslation {
  cases: string;
  decisions: string;
  stack: string;
  experience: string;
  contact: string;
}

export interface MetricTranslation {
  label: string;
  val: string;
  desc: string;
}

export interface CaseTranslation {
  company: string;
  role: string;
  desc: string;
  period?: string;
}

export interface DecisionTranslation {
  project: string;
  title: string;
  text: string;
}

export interface ExpTranslation {
  title: string;
  company: string;
  period: string;
  metric: string;
  desc: string;
}

export interface EduTranslation {
  title: string;
  school: string;
  date: string;
}

export interface TechEntry {
  id: string;
  name: string;
  category: string;
  catEs: string;
  descEs: string;
  descEn: string;
}
