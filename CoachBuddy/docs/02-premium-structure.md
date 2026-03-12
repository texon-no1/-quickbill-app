# CoachBuddy - Premium Content Structure

This document outlines the organization and pricing logic for premium content within CoachBuddy, designed to be scalable for a production environment.

## 1. Content Categories

### Training Routines
- **Category: Lower Body & Explosiveness**
  - Squat Stability (Routine)
  - Plyometric Jump Basics (Routine)
- **Category: Core & Balance**
  - Plank Progressions (Routine)
  - Single-Leg Balance (Routine)
- **Category: Agility & Footwork**
  - Defensive Sliding Drills (Routine)
  - Ladder Agility (Routine)

### Video Courses
- **"Pro Shooting Fundamentals"**
  - 5-module comprehensive shooting course.
  - Includes AI-guided benchmarks.
- **"Vertical Jump Explosion"**
  - 8-week structured program.
  - Video lessons + exclusive routines.

## 2. Pricing & Access Model

| Content Type | Pricing Model | Access Policy |
| :--- | :--- | :--- |
| **Basic Analysis** | Free (Limit: 3/mo) | Standard Users |
| **Pro Analysis** | Subscription (Pro) | Pro Plan Members |
| **Standard Routines** | Free | All Users |
| **Premium Routines** | Individual Purchase | One-time or Pro Plan |
| **Video Courses** | Individual Purchase / Subscription | One-time or Pro Plan |
| **Full Access (Pro)** | Monthly/Annual Subscription | Everything Unlocked |

## 3. Data Structure (Simulation)

```json
{
  "premium_items": [
    {
      "id": "v_shooting_01",
      "type": "video_course",
      "title": "Pro Shooting Fundamentals",
      "price": 49000,
      "currency": "KRW",
      "is_pro_included": true
    },
    {
      "id": "r_jump_05",
      "type": "routine",
      "title": "Explosive Landing Technique",
      "price": 5000,
      "currency": "KRW",
      "is_pro_included": true
    }
  ]
}
```
