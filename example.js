// npm install posthog-node --save
// or
// yarn add posthog-node

import PostHog from 'posthog-node'

const posthog = new PostHog(
    "", // project API key
    {
        host: "https://app.posthog.com", // You can omit this line if using PostHog Cloud
        personalApiKey: "" // You can find this in your user settings
    }
)

// Capture an event
posthog.capture({ distinctId: "distinct_id", event: "event", properties: { "property1": "value", "property2": "value" }, sendFeatureFlags: true })

console.log(posthog.isFeatureEnabled("beta-feature", "distinct_id", false))
console.log(posthog.isFeatureEnabled("beta-feature", "distinct_id", false, { "company": "id:5" }))

// console.log("sleeping")
// sleep 5

console.log(posthog.isFeatureEnabled("beta-feature", "distinct_id"))

// Alias a previous distinct id with a new one

posthog.alias({ distinctId: "distinct_id", alias: "new_distinct_id" })

posthog.capture({ distinctId: "new_distinct_id", event: "event2", properties: { property1: "value", property2: "value" } })
posthog.capture({
    distinctId: "new_distinct_id", event: "event-with-groups", properties: { property1: "value", property2: "value" }, groups: { "company": "id:5" }
})

// // Add properties to the person
posthog.identify({ distinctId: "new_distinct_id", properties: { email: "something@something.com" } })

// Add properties to a group
posthog.groupIdentify({ groupType: "company", groupKey: "id:5", properties: { "employees": 11 } })

// properties set only once to the person
posthog.capture({ distinctId: "new_distinct_id", event: "signup", properties: { $set_once: { "self_serve_signup": true } } })

// sleep 3
posthog.capture({ distinctId: "new_distinct_id", event: "signup", properties: { $set_once: { "self_serve_signup": false } } })

// this will not change the property (because it was already set)
posthog.capture({ distinctId: "new_distinct_id", event: "signup", properties: { $set: { "current_browser": "Chrome" } } })
posthog.capture({ distinctId: "new_distinct_id", event: "signup", properties: { $set: { "current_browser": "Firefox" } } })

// On program exit, call shutdown to stop pending pollers and flush any remaining events
client.shutdown()