import PostHog from 'posthog-node'

const posthog = new PostHog(
    'sTMFPsFhdP1Ssg', // project API key 
    { host: 'https://app.posthog.com' } // You can omit this line if using PostHog Cloud
)

// Capture an event
posthog.capture({ distinct_id: "distinct_id", event: "event", properties: { "property1": "value", "property2": "value" }, send_feature_flags: true })

console.log(posthog.is_feature_enabled("beta-feature", "distinct_id"))
console.log(posthog.is_feature_enabled("beta-feature", "distinct_id", { "company": "id:5" }))

// console.log("sleeping")
// setTimeout(console.log("sleeping"), 5000)

console.log(posthog.is_feature_enabled("beta-feature", "distinct_id"))

// Alias a previous distinct id with a new one

posthog.alias({ distinct_id: "distinct_id", alias: "new_distinct_id" })

posthog.capture({ distinct_id: "new_distinct_id", event: "event2", properties: { property1: "value", property2: "value" } })
posthog.capture({
    distinct_id: "new_distinct_id", event: "event-with-groups", properties: { property1: "value", property2: "value" }, groups: { "company": "id:5" }
})

// // Add properties to the person
posthog.identify({ distinct_id: "new_distinct_id", properties: { email: "something@something.com" } })

// Add properties to a group
posthog.groupIdentify({ groupType: "company", groupKey: "id:5", properties: { "employees": 11 } })

// properties set only once to the person
posthog.capture({ distinct_id: "new_distinct_id", event: "signup", properties: { $set_once: { "self_serve_signup": true } } })

// sleep 3
posthog.capture({ distinct_id: "new_distinct_id", event: "signup", properties: { $set_once: { "self_serve_signup": false } } })

// this will not change the property (because it was already set)
posthog.capture({ distinct_id: "new_distinct_id", event: "signup", properties: { $set: { "current_browser": "Chrome" } } })
posthog.capture({ distinct_id: "new_distinct_id", event: "signup", properties: { $set: { "current_browser": "Firefox" } } })


client.capture({
    distinctId: 'distinct id',
    event: 'movie played',
    properties: {
        movieId: '123',
        category: 'romcom'
    }
})


// On program exit, call shutdown to stop pending pollers and flush any remaining events
client.shutdown()