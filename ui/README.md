# AI-Powered Leaving Certificate Correction Platform

## Overview

A comprehensive platform for AI-assisted marking of Irish Leaving Certificate examinations, serving seven distinct stakeholder personas with role-based access control and explainable AI capabilities.

## Features

### Core Platform Capabilities
- **AI-Assisted Marking**: Advanced AI agents for accurate, consistent examination marking
- **Role-Based Access Control**: Seven distinct personas with tailored interfaces
- **Explainable AI**: Confidence scores, marking rationales, and bias detection
- **Appeals System**: Comprehensive workflow for appeals processing
- **Real-Time Analytics**: Performance metrics and insights for all stakeholders
- **GDPR Compliant**: Full compliance with data protection regulations

### Supported Personas
1. **Teachers/Examiners** - Review and override AI marking decisions
2. **Students** - View results, feedback, and initiate appeals
3. **Reviewers/Moderators** - Quality assurance and appeals processing
4. **SEC Administrators** - System administration and oversight
5. **School Administrators** - School performance and student management
6. **Parents** - Monitor child's academic progress
7. **Policy Makers** - Strategic insights and policy analytics

## Technology Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Authentication**: NextAuth.js with role-based access control
- **State Management**: Zustand, React Query
- **UI Components**: Custom design system with accessibility compliance
- **Charts & Analytics**: Recharts
- **Styling**: Tailwind CSS with custom design tokens
- **Testing**: Jest, React Testing Library

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ui
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```
Edit `.env.local` with your configuration values.

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Demo Access

The platform includes demo accounts for each persona:

| Role | Email | Password | Description |
|------|-------|----------|-------------|
| Teacher | `teacher@demo.ie` | `demo123` | Review AI marking decisions |
| Student | `student@demo.ie` | `demo123` | View results and feedback |
| Reviewer | `reviewer@demo.ie` | `demo123` | Quality assurance and appeals |
| SEC Admin | `admin@sec.ie` | `demo123` | System administration |
| School Admin | `principal@school.ie` | `demo123` | School performance |
| Parent | `parent@demo.ie` | `demo123` | Child progress monitoring |
| Policy Maker | `policy@education.ie` | `demo123` | Strategic analytics |

## Project Structure

```
src/
├── app/                    # Next.js 14 app directory
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Main dashboard routing
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── ai/               # AI-specific components
│   └── dashboards/       # Role-specific dashboards
├── lib/                  # Utility libraries
│   ├── auth.ts          # Authentication logic
│   └── mock-data.ts     # Demo data
└── types/               # TypeScript type definitions
```

## Key Components

### UI Components
- **Layout**: Main application layout with navigation
- **Button**: Accessible button component with variants
- **Card**: Flexible card container for content
- **Badge**: Status and label indicators
- **ConfidenceScore**: AI confidence display with traffic light system
- **MarkingRationale**: Detailed AI decision explanations

### Dashboard Components
- **TeacherDashboard**: Marking queue, paper review, and analytics
- **StudentDashboard**: Results, feedback, and academic planning
- Additional role-specific dashboards in development

### AI Components
- **ConfidenceScoreDisplay**: Multi-dimensional confidence metrics
- **MarkingRationaleDisplay**: Explainable AI decision breakdown
- **BiasDetection**: Algorithmic fairness monitoring

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode

### Code Style
- ESLint with Next.js configuration
- Prettier for code formatting
- TypeScript strict mode enabled
- Tailwind CSS for styling

### Accessibility
- WCAG 2.1 AA compliance
- Keyboard navigation support
- Screen reader compatibility
- High contrast mode support
- Reduced motion preferences

## Deployment

### Production Build
```bash
npm run build
npm run start
```

### Environment Variables
Required environment variables for production:
- `NEXTAUTH_SECRET`: NextAuth.js secret
- `DATABASE_URL`: Database connection string
- `GOOGLE_CLOUD_VISION_API_KEY`: OCR processing
- `OPENAI_API_KEY`: AI marking capabilities

## Security

- Role-based access control (RBAC)
- CSRF protection via NextAuth.js
- SQL injection prevention
- XSS protection
- HTTPS enforcement in production
- Secure session management

## Compliance

- **GDPR**: Full compliance with data protection regulations
- **Educational Standards**: Meets Irish educational requirements
- **Accessibility**: WCAG 2.1 AA compliant
- **Security**: Industry-standard security practices

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Support

For questions, issues, or contributions, please contact the development team or create an issue in the repository.

## License

This project is part of the National AI Challenge 2025 submission for Ireland's educational innovation initiative.