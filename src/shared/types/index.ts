// 通用选项接口
export interface Option {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
  withCount?: boolean;
}

// 用户相关类型
export interface Profile {
  id: string;
  phone?: string;
  email?: string;
  full_name?: string;
  avatar_url?: string;
  role: 'admin' | 'member';
  github_username?: string;
  gitlab_username?: string;
  created_at: string;
  updated_at: string;
}

// 项目相关类型
export interface Project {
  id: string;
  name: string;
  description?: string;
  repository_url?: string;
  repository_type?: 'github' | 'gitlab' | 'other';
  default_branch: string;
  programming_languages: string;
  owner_id: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  owner?: Profile;
}

export interface ProjectMember {
  id: string;
  project_id: string;
  user_id: string;
  role: 'owner' | 'admin' | 'member' | 'viewer';
  permissions: string;
  joined_at: string;
  created_at: string;
  user?: Profile;
  project?: Project;
}

// 审计相关类型
export interface AuditTask {
  id: string;
  project_id: string;
  task_type: 'repository' | 'instant';
  status: 'pending' | 'running' | 'completed' | 'failed';
  branch_name?: string;
  exclude_patterns: string;
  scan_config: string;
  total_files: number;
  scanned_files: number;
  total_lines: number;
  issues_count: number;
  quality_score: number;
  started_at?: string;
  completed_at?: string;
  created_by: string;
  created_at: string;
  project?: Project;
  creator?: Profile;
}

export interface AuditIssue {
  id: string;
  task_id: string;
  file_path: string;
  line_number?: number;
  column_number?: number;
  issue_type: 'bug' | 'security' | 'performance' | 'style' | 'maintainability';
  severity: 'critical' | 'high' | 'medium' | 'low';
  title: string;
  description?: string;
  suggestion?: string;
  code_snippet?: string;
  ai_explanation?: string;
  status: 'open' | 'resolved' | 'false_positive';
  resolved_by?: string;
  resolved_at?: string;
  created_at: string;
  task?: AuditTask;
  resolver?: Profile;
}

export interface InstantAnalysis {
  id: string;
  user_id: string;
  language: string;
  code_content: string;
  analysis_result: string;
  issues_count: number;
  quality_score: number;
  analysis_time: number;
  created_at: string;
  user?: Profile;
}

// 表单相关类型
export interface CreateProjectForm {
  name: string;
  description?: string;
  repository_url?: string;
  repository_type?: 'github' | 'gitlab' | 'other';
  default_branch?: string;
  programming_languages: string[];
}

export interface CreateAuditTaskForm {
  project_id: string;
  task_type: 'repository' | 'instant';
  branch_name?: string;
  exclude_patterns: string[];
  scan_config: {
    include_tests?: boolean;
    include_docs?: boolean;
    max_file_size?: number;
    analysis_depth?: 'basic' | 'standard' | 'deep';
  };
}

export interface InstantAnalysisForm {
  language: string;
  code_content: string;
}

// 统计相关类型
export interface ProjectStats {
  total_projects: number;
  active_projects: number;
  total_tasks: number;
  completed_tasks: number;
  total_issues: number;
  resolved_issues: number;
  avg_quality_score: number;
}

export interface IssueStats {
  by_type: Record<string, number>;
  by_severity: Record<string, number>;
  by_status: Record<string, number>;
  trend_data: Array<{
    date: string;
    count: number;
  }>;
}

// API响应类型
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  has_more: boolean;
}

// 代码分析结果类型
export interface CodeAnalysisResult {
  issues: Array<{
    type: string;
    severity: string;
    title: string;
    description: string;
    suggestion: string;
    line: number;
    column?: number;
    code_snippet: string;
    ai_explanation: string;
    xai?: {
      what: string;
      why: string;
      how: string;
      learn_more?: string;
    };
  }>;
  quality_score: number;
  summary: {
    total_issues: number;
    critical_issues: number;
    high_issues: number;
    medium_issues: number;
    low_issues: number;
  };
  metrics: {
    complexity: number;
    maintainability: number;
    security: number;
    performance: number;
  };
}

// GitHub/GitLab集成类型
export interface Repository {
  id: string;
  name: string;
  full_name: string;
  description?: string;
  html_url: string;
  clone_url: string;
  default_branch: string;
  language?: string;
  languages?: Record<string, number>;
  private: boolean;
  updated_at: string;
}

export interface Branch {
  name: string;
  commit: {
    sha: string;
    url: string;
  };
  protected: boolean;
}

// 通知类型
export interface Notification {
  id: string;
  type: 'task_completed' | 'task_failed' | 'new_issue' | 'issue_resolved';
  title: string;
  message: string;
  data?: any;
  read: boolean;
  created_at: string;
}

// 系统配置类型
export interface SystemConfig {
  max_file_size: number;
  supported_languages: string[];
  analysis_timeout: number;
  max_concurrent_tasks: number;
  notification_settings: {
    email_enabled: boolean;
    webhook_url?: string;
  };
}