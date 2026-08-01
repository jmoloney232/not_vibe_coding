/* Redesign-only supplementary data — does not modify the original exercise's
   data.js/data contract. Adds the content a real feature-flag detail page
   needs and the original was missing: targeting rules, rollout history,
   and related flags. Keyed to the same flag `key` values already in
   data.js so this stays a genuine extension, not a parallel product. */
const RIDGELINE_TARGETING = {
  checkout_v2_rollout: [
    "user.country in ['US', 'CA']",
    "account.plan != 'trial'",
    "35% of remaining matched users (hash-bucketed on user.id)",
  ],
};

const RIDGELINE_HISTORY = {
  checkout_v2_rollout: [
    { date: "2026-07-29T14:12:00-05:00", by: "M. Okonkwo", change: "25% → 35%", note: "Error rate held flat through the 25% step; proceeding." },
    { date: "2026-07-22T10:05:00-05:00", by: "M. Okonkwo", change: "10% → 25%", note: "" },
    { date: "2026-07-15T09:40:00-05:00", by: "R. Delacroix", change: "0% → 10%", note: "Initial rollout, US/CA only." },
  ],
};

const RIDGELINE_RELATED = {
  checkout_v2_rollout: [
    { key: "legacy_billing_removal", relation: "Depends on this flag reaching 100% before legacy billing can be removed" },
    { key: "checkout_flow_redesign_2026_q3_holdout_group_experiment", relation: "Shares a holdout group with this flag's control group" },
  ],
};
