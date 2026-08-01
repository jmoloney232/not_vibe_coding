const RIDGELINE_FLAGS = [
  {
    key: "checkout_v2_rollout",
    description: "New checkout flow with saved payment methods",
    environment: "production",
    percentage: 35,
    segments: "All users",
    lastChanged: "2026-07-29T14:12:00-05:00",
    lastChangedBy: "M. Okonkwo",
  },
  {
    key: "new_dashboard_nav",
    description: "Redesigned left navigation with collapsible sections",
    environment: "production",
    percentage: 100,
    segments: "All users",
    lastChanged: "2026-07-18T09:03:00-05:00",
    lastChangedBy: "S. Park",
  },
  {
    key: "ai_search_suggestions",
    description: "AI-powered search autocomplete",
    environment: "production",
    percentage: 5,
    segments: "Internal + beta program",
    lastChanged: "2026-07-30T11:45:00-05:00",
    lastChangedBy: "R. Delacroix",
  },
  {
    key: "bulk_export_csv",
    description: "Bulk CSV export for reports",
    environment: "staging",
    percentage: 100,
    segments: "All staging users",
    lastChanged: "2026-07-31T08:20:00-05:00",
    lastChangedBy: "M. Okonkwo",
  },
  {
    key: "dark_mode_v3",
    description: "Refreshed dark theme tokens",
    environment: "production",
    percentage: 0,
    segments: "Not targeted",
    lastChanged: "2026-06-02T16:00:00-05:00",
    lastChangedBy: "S. Park",
  },
  {
    key: "legacy_billing_removal",
    description: "Kill-switch for legacy billing code path — leave at 100% unless a billing incident requires an emergency rollback",
    environment: "production",
    percentage: 100,
    segments: "All users",
    lastChanged: "2025-11-14T10:00:00-06:00",
    lastChangedBy: "R. Delacroix",
  },
  {
    key: "experimental_recommendation_engine",
    description: "",
    environment: "development",
    percentage: 10,
    segments: "Dev team only",
    lastChanged: "2026-07-31T13:02:00-05:00",
    lastChangedBy: "M. Okonkwo",
  },
  {
    key: "checkout_flow_redesign_2026_q3_holdout_group_experiment",
    description: "Q3 holdout group for checkout redesign impact measurement",
    environment: "production",
    percentage: 50,
    segments: "Holdout group B",
    lastChanged: "2026-07-25T15:30:00-05:00",
    lastChangedBy: "S. Park",
  },
];

function ridgelineFormatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}
