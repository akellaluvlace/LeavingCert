// pages/HomePage.tsx
import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Modal,
  Fade,
  Backdrop,
  Card,
  CardContent,
  GlobalStyles,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import ScheduleIcon from '@mui/icons-material/Schedule';
import FeedbackForm from '../components/FeedbackForm';
import MeetTheMakers, { defaultMakers } from '../components/MeetTheMakers';
import AnimatedArrowButton from '../components/AnimatedArrowButton';
import { LaunchFilledButton, FillWipeButton } from '../components/AnimatedButtons';
import type { Theme, SxProps } from '@mui/material/styles';

// Import background images
import bothImage from '../assets/both.png';
import studentImage from '../assets/student.png';
import teacherImage from '../assets/teacher.png';

// Import custom icons
import mathTeacherIcon from '../assets/undraw_math_ldpv.svg';
import aiPanelReviewIcon from '../assets/AiPanelReview.svg';
import confidenceCheckIcon from '../assets/ConfidenceCheck.svg';
import superiorAccuracyIcon from '../assets/SuperiorAccuracy.svg';
import perfectConsistencyIcon from '../assets/PerfectConsistency.svg';
import systemDifferentIcon from '../assets/systemDifferent.svg';
import guardrailsIcon from '../assets/Guardrails.svg';
import bottleneckIcon from '../assets/Bottleneck.svg';
import aiExpertsIcon from '../assets/AIexperts.svg';
import concernIcon from '../assets/Concern.svg';
import peopleSayingIcon from '../assets/PeopleSaying.svg';
import massiveEfficiencyIcon from '../assets/MassiveEfficiency.svg';
import fullTransparencyIcon from '../assets/FullTransparency.svg';

const modalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '90%', sm: '70%', md: 600 },
  p: 0,
  borderRadius: 2,
  overflow: 'hidden',
};

const keyframes = `
  @keyframes floating {
    0% { transform: translateY(0px); }
    50% { transform: translateY(10px); }
    100% { transform: translateY(0px); }
  }
  @keyframes sweepY {
    0% { transform: translateY(-25%); opacity: .85; }
    50% { transform: translateY(25%); opacity: 1; }
    100% { transform: translateY(-25%); opacity: .85; }
  }
`;

// deterministic "random"
const r = (seed: number) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};
const orbVars = (seed: number): SxProps<Theme> => {
  const aSize = Math.round(110 + r(seed + 1) * 70); // 110-180px
  const bSize = Math.round(70 + r(seed + 2) * 80);  // 70-150px
  const aLeftPct = Math.round(8 + r(seed + 3) * 74); // 8%-82%
  const aTopPct = Math.round(-12 + r(seed + 4) * 32); // -12%-20%
  const bLeftPct = Math.round(4 + r(seed + 5) * 84); // 4%-88%
  const bBottomPct = Math.round(r(seed + 6) * 28); // 0%-28%
  const aDelay = Math.round(-1200 + r(seed + 7) * 2400);
  const bDelay = Math.round(-1800 + r(seed + 8) * 2400);

  // CSS vars consumed by ::before/::after in theme overrides
  return {
    ['--orbA-size' as any]: `${aSize}px`,
    ['--orbA-left' as any]: `${aLeftPct}%`,
    ['--orbA-top' as any]: `${aTopPct}%`,
    ['--orbA-delay' as any]: `${aDelay}ms`,
    ['--orbB-size' as any]: `${bSize}px`,
    ['--orbB-left' as any]: `${bLeftPct}%`,
    ['--orbB-bottom' as any]: `${bBottomPct}%`,
    ['--orbB-delay' as any]: `${bDelay}ms`,
  };
};

const HomePage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  // Preload hero images for better performance
  useEffect(() => {
    const preloadImages = [bothImage, studentImage, teacherImage];
    let loadedCount = 0;

    preloadImages.forEach((src) => {
      const img = new Image();
      img.onload = () => {
        loadedCount++;
        if (loadedCount === preloadImages.length) {
          setImagesLoaded(true);
        }
      };
      img.src = src;
    });
  }, []);


  return (
    <>
      <GlobalStyles styles={keyframes} />
      <Box sx={{ 
        background: 'linear-gradient(135deg, rgba(15, 15, 35, 0.9) 0%, rgba(26, 26, 46, 0.8) 100%)',
        minHeight: { xs: 'auto', md: '100vh' },
        pt: { xs: 12, md: 0 }, 
        pb: { xs: 8, md: 0 },
        display: { xs: 'block', md: 'flex' },
        alignItems: { md: 'center' },
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(ellipse at center, rgba(233, 69, 96, 0.1) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 1,
        },
        // Background images - mobile: student only, desktop: all three
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: imagesLoaded ? {
            xs: `
              linear-gradient(
                rgba(15, 15, 35, 0.8) 0%,
                rgba(15, 15, 35, 0.6) 50%,
                rgba(15, 15, 35, 0.8) 100%
              ),
              url(${studentImage}) right center/143% 100% no-repeat
            `,
            md: `
              linear-gradient(to right, 
                rgba(15, 15, 35, 0.85) 0%,
                rgba(15, 15, 35, 0.7) 33%,
                rgba(15, 15, 35, 0.7) 66%,
                rgba(15, 15, 35, 0.85) 100%
              ),
              url(${bothImage}) left/33.33% 100% no-repeat,
              url(${studentImage}) center/33.33% 100% no-repeat,
              url(${teacherImage}) right/33.33% 100% no-repeat
            `
          } : 'linear-gradient(135deg, rgba(15, 15, 35, 0.9) 0%, rgba(26, 26, 46, 0.8) 100%)',
          opacity: imagesLoaded ? 0.3 : 0.8,
          filter: imagesLoaded ? 'blur(1px) saturate(0.7)' : 'none',
          pointerEvents: 'none',
          zIndex: 0,
          transition: 'opacity 0.5s ease-in-out, filter 0.5s ease-in-out',
        },
      }}>
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2 }}>
          <Typography
            component="h1"
            variant="h2"
            align="center"
            gutterBottom
            sx={{ 
              fontWeight: 800,
              fontSize: { xs: '3.2rem', md: '4.5rem' },
              position: 'relative',
              zIndex: 3,
              mb: { xs: 12, md: 16 },
              transform: 'translateY(-78px)',
              background: 'linear-gradient(45deg, #e94560, #f39c12, #ff6b35) !important',
              WebkitBackgroundClip: 'text !important',
              WebkitTextFillColor: 'transparent !important',
              backgroundClip: 'text !important',
              color: 'transparent !important',
            }}
          >
            Faster, Fairer Leaving Cert Grading
          </Typography>
          <Typography 
            variant="h5" 
            align="center" 
            color="text.secondary" 
            paragraph
            sx={{
              fontSize: { xs: '1.0rem', md: '1.3rem' },
              lineHeight: 1.6,
              maxWidth: '800px',
              mx: 'auto',
              position: 'relative',
              zIndex: 3,
              mb: 3,
              textShadow: '0 1px 6px rgba(0, 0, 0, 0.5)',
            }}
          >
            AI-assisted. Teacher-supervised. High-confidence only. Our hybrid system speeds up marking,
            keeps standards consistent, and routes any uncertainty for Later Human Review.
          </Typography>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            mt: 2, 
            gap: 3,
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: 'center',
            position: 'relative',
            zIndex: 3,
          }}>
            <LaunchFilledButton 
              onClick={handleOpen}
              label="Share Your Feedback"
              gradient={['#e94560', '#f39c12', '#ff6b35']}
            />
            <FillWipeButton 
              onClick={() => window.open(window.location.hostname === 'localhost' ? 'http://localhost:3000' : 'https://irish-lc-demo.netlify.app', '_blank')}
              label="🇮🇪 Try Irish LC Demo"
              gradient={['#e94560', '#f39c12', '#ff6b35']}
              outlineColor="#f39c12"
            />
          </Box>
        </Container>
      </Box>

      {/* Irish Demo Banner */}
      <Box sx={{ 
        py: 6, 
        background: 'linear-gradient(135deg, rgba(76, 175, 80, 0.1) 0%, rgba(46, 125, 50, 0.05) 100%)',
        borderTop: '1px solid rgba(76, 175, 80, 0.2)',
        borderBottom: '1px solid rgba(76, 175, 80, 0.2)'
      }}>
        <Container maxWidth="lg">
          <Box sx={{ 
            textAlign: 'center',
            p: 4,
            borderRadius: 3,
            background: 'rgba(0, 0, 0, 0.3)',
            border: '1px solid rgba(76, 175, 80, 0.3)',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: '-100%',
              width: '200%',
              height: '100%',
              background: 'linear-gradient(90deg, transparent, rgba(76, 175, 80, 0.1), transparent)',
              animation: 'shimmer 3s infinite',
            },
            '@keyframes shimmer': {
              '0%': { left: '-100%' },
              '100%': { left: '100%' },
            },
          }}>
            <Typography variant="h3" sx={{ 
              fontWeight: 700, 
              color: '#4caf50', 
              mb: 2,
              textShadow: '0 2px 4px rgba(0,0,0,0.5)'
            }}>
              🇮🇪 Experience Our Irish Leaving Certificate Demo
            </Typography>
            <Typography variant="h6" sx={{ 
              color: 'rgba(255,255,255,0.9)', 
              mb: 4, 
              maxWidth: '600px', 
              mx: 'auto',
              lineHeight: 1.6
            }}>
              See our AI grading system in action with a complete Irish education platform.
              Test all 7 user roles: Students, Teachers, Administrators, Parents, and more.
            </Typography>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              gap: 3,
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: 'center'
            }}>
              <LaunchFilledButton 
                onClick={() => window.open(window.location.hostname === 'localhost' ? 'http://localhost:3000' : 'https://irish-lc-demo.netlify.app', '_blank')}
                label="🚀 Launch Full Demo Platform"
                gradient={['#4caf50', '#66bb6a', '#81c784']}
              />
              <FillWipeButton 
                onClick={() => window.open(window.location.hostname === 'localhost' ? 'http://localhost:3000/auth/signin' : 'https://irish-lc-demo.netlify.app/auth/signin', '_blank')}
                label="👨‍🏫 Try Teacher Dashboard"
                gradient={['#4caf50', '#66bb6a', '#81c784']}
                outlineColor="#66bb6a"
              />
            </Box>
            <Typography variant="body2" sx={{ 
              color: 'rgba(255,255,255,0.7)', 
              mt: 3,
              fontSize: '0.9rem'
            }}>
              ✨ Complete role-based dashboards • 📊 Real-time analytics • 🤖 Explainable AI • 🔄 Appeals workflow
            </Typography>
          </Box>
        </Container>
      </Box>

      <Container sx={{ pt: 8, pb: 1 }} maxWidth="lg">
        {/* Problem framing */}
        <Box sx={{ mb: 6 }}>
          {/* Mobile layout - stacked */}
          <Box sx={{ 
            display: { xs: 'block', md: 'none' },
            textAlign: 'center'
          }}>
            <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
              The Annual Grading Bottleneck
            </Typography>
            
            <Typography variant="body1" color="text.secondary" maxWidth="md" sx={{ mx: 'auto', mb: 4 }}>
              Rising candidate numbers and examiner shortages slow results, increase stress, and strain teachers.
              We believe there's a smarter, safer way: let AI handle the routine checks under strict guardrails,
              and keep teachers in charge of the edge cases.
            </Typography>
            
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Box 
                component="img"
                src={bottleneckIcon}
                alt="Annual Grading Bottleneck Illustration"
                sx={{ 
                  width: 250,
                  height: 'auto',
                  maxWidth: '100%'
                }}
              />
            </Box>
          </Box>

          {/* Desktop layout - 2 columns */}
          <Box sx={{ 
            display: { xs: 'none', md: 'flex' },
            alignItems: 'center',
            gap: 4
          }}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
                The Annual Grading Bottleneck
              </Typography>
              
              <Typography variant="body1" color="text.secondary">
                Rising candidate numbers and examiner shortages slow results, increase stress, and strain teachers.
                We believe there's a smarter, safer way: let AI handle the routine checks under strict guardrails,
                and keep teachers in charge of the edge cases.
              </Typography>
            </Box>
            
            <Box sx={{ 
              flex: '0 0 auto',
              display: 'flex',
              justifyContent: 'center'
            }}>
              <Box 
                component="img"
                src={bottleneckIcon}
                alt="Annual Grading Bottleneck Illustration"
                sx={{ 
                  width: 250,
                  height: 'auto',
                  maxWidth: '100%'
                }}
              />
            </Box>
          </Box>
        </Box>

        {/* Stats strip */}
        <Box sx={ {mb :4 }}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 4 }}>
              <Card className="simple-card" sx={{ 
                minHeight: '200px',
                '&:hover': {
                  border: '1px solid rgba(243, 156, 18, 0.4)',
                  boxShadow: '0 12px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(243, 156, 18, 0.3)'
                }
              }}>
                <CardContent className="simple-content" sx={{ display: 'flex', flexDirection: 'column', height: '100%', p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                    <TrendingUpIcon className="stats-icon" sx={{ fontSize: 32, color: '#e94560', mr: 1 }} />
                    <Typography variant="h5" sx={{ fontWeight: 700, color: '#e94560' }}>Record Volume</Typography>
                  </Box>
                  <Box sx={{ textAlign: 'center', mb: 2 }}>
                    <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }} className="stats-number">136,000</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>students sat State exams in 2024</Typography>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>~4,000,000</Typography>
                    <Typography variant="body2" color="text.secondary">papers distributed</Typography>
                  </Box>
                  <Box sx={{ mt: 'auto', p: 2, backgroundColor: 'rgba(233, 69, 96, 0.1)', borderRadius: 1, border: '1px solid rgba(233, 69, 96, 0.2)' }}>
                    <Typography variant="body2" sx={{ fontWeight: 500, fontSize: '0.85rem' }}>
                      <strong>Why it matters:</strong> Volume keeps rising; logistics are maxed.
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <Card className="simple-card" sx={{ 
                minHeight: '200px',
                '&:hover': {
                  border: '1px solid rgba(233, 69, 96, 0.4)',
                  boxShadow: '0 12px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(233, 69, 96, 0.3)'
                }
              }}>
                <CardContent className="simple-content" sx={{ display: 'flex', flexDirection: 'column', height: '100%', p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                    <TrendingDownIcon className="stats-icon" sx={{ fontSize: 32, color: '#f39c12', mr: 1 }} />
                    <Typography variant="h5" sx={{ fontWeight: 700, color: '#f39c12' }}>Capacity Gap</Typography>
                  </Box>
                  <Box sx={{ textAlign: 'center', mb: 2 }}>
                    <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }} className="stats-number">36.7 → 53.5</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>candidates per examiner (+46%)</Typography>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>&lt;3,000 vs ~4,000</Typography>
                    <Typography variant="body2" color="text.secondary">examiners needed vs available</Typography>
                  </Box>
                  <Box sx={{ mt: 'auto', p: 2, backgroundColor: 'rgba(243, 156, 18, 0.1)', borderRadius: 1, border: '1px solid rgba(243, 156, 18, 0.2)' }}>
                    <Typography variant="body2" sx={{ fontWeight: 500, fontSize: '0.85rem' }}>
                      <strong>Why it matters:</strong> Fewer markers, more scripts → AI triages routine answers.
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <Card className="simple-card" sx={{ 
                minHeight: '200px',
                '&:hover': {
                  border: '1px solid rgba(243, 156, 18, 0.4)',
                  boxShadow: '0 12px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(243, 156, 18, 0.3)'
                }
              }}>
                <CardContent className="simple-content" sx={{ display: 'flex', flexDirection: 'column', height: '100%', p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                    <ScheduleIcon className="stats-icon" sx={{ fontSize: 32, color: '#e94560', mr: 1 }} />
                    <Typography variant="h5" sx={{ fontWeight: 700, color: '#e94560' }}>Results Drift</Typography>
                  </Box>
                  <Box sx={{ textAlign: 'center', mb: 2 }}>
                    <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }} className="stats-number">3 Years</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>slipped into September (2020-22)</Typography>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>2024: Aug 23</Typography>
                    <Typography variant="body2" color="text.secondary">vs 2019: Aug 13</Typography>
                  </Box>
                  <Box sx={{ mt: 'auto', p: 2, backgroundColor: 'rgba(233, 69, 96, 0.1)', borderRadius: 1, border: '1px solid rgba(233, 69, 96, 0.2)' }}>
                    <Typography variant="body2" sx={{ fontWeight: 500, fontSize: '0.85rem' }}>
                      <strong>Why it matters:</strong> AI speeds marking so results land reliably in mid-August.
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Container>

      {/* Section divider */}
      <Box className="section-divider" />

      <Container sx={{ pt: 4, pb: 8 }} maxWidth="xl">
        
        {/* Process */}
        <Box sx={{ py: 1, px: { xs: 0, md: 4 } }}>
          {/* Mobile layout - stacked */}
          <Box sx={{ 
            display: { xs: 'block', md: 'none' },
            textAlign: 'center',
            mb: 6
          }}>
            <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
              Our Innovative Approach: A Panel of AI Experts
            </Typography>
            
            <Typography variant="body1" color="text.secondary" maxWidth="md" sx={{ mx: 'auto', mb: 4 }}>
              Three specialized AI graders review each answer from different angles, then we apply a strict
              confidence threshold. Anything below the bar goes straight to a teacher for Later Human Review.
            </Typography>
            
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Box 
                component="img"
                src={aiExpertsIcon}
                alt="AI Experts Panel Illustration"
                sx={{ 
                  width: 250,
                  height: 'auto',
                  maxWidth: '100%'
                }}
              />
            </Box>
          </Box>

          {/* Desktop layout - 2 columns (image left, text right) */}
          <Box sx={{ 
            display: { xs: 'none', md: 'flex' },
            alignItems: 'center',
            gap: 4,
            mb: 6
          }}>
            <Box sx={{ 
              flex: '0 0 auto',
              display: 'flex',
              justifyContent: 'center'
            }}>
              <Box 
                component="img"
                src={aiExpertsIcon}
                alt="AI Experts Panel Illustration"
                sx={{ 
                  width: 250,
                  height: 'auto',
                  maxWidth: '100%'
                }}
              />
            </Box>

            <Box sx={{ flex: 1 }}>
              <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
                Our Innovative Approach: A Panel of AI Experts
              </Typography>
              
              <Typography variant="body1" color="text.secondary">
                Three specialized AI graders review each answer from different angles, then we apply a strict
                confidence threshold. Anything below the bar goes straight to a teacher for Later Human Review.
              </Typography>
            </Box>
          </Box>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center', 
            justifyContent: 'center', 
            gap: { xs: 2, md: 2 } 
          }}>
            {/* Step 1 */}
            <Box sx={{ flex: { xs: '1 1 auto', md: '0 1 320px' }, maxWidth: { xs: '100%', md: '320px' }, width: { xs: '100%', md: 'auto' } }}>
              <Card className="green-border-card" sx={{ height: { md: '400px' }, ...orbVars(201) }}>
                <CardContent className="green-border-content" sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Box 
                    component="img"
                    src={mathTeacherIcon}
                    alt="Math Teacher"
                    sx={{ 
                      width: 150,
                      height: 150,
                      mb: 2
                    }} 
                  />
                  <Box sx={{
                    px: 2,
                    py: 1,
                    borderRadius: 2,
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    mb: 2,
                    width: '100%',
                    textAlign: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: '-100%',
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
                      animation: 'shimmer 2s infinite',
                    },
                    '@keyframes shimmer': {
                      '0%': { left: '-100%' },
                      '100%': { left: '100%' },
                    },
                  }}>
                    <Typography variant="h6" component="h3" sx={{ fontSize: '0.85rem', fontWeight: 600, lineHeight: 1.2 }}>
                      Teacher Standard
                    </Typography>
                  </Box>
                  <Box sx={{
                    flex: 1,
                    p: 2,
                    borderRadius: 2,
                    backgroundColor: 'rgba(0, 0, 0, 0.25)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                    <Typography sx={{ fontSize: '0.85rem', lineHeight: 1.4, textAlign: 'center' }}>
                      Examiners define rubrics, keys, and sample answers. AI learns the standard—never invents one.
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Box>
            
            {/* Arrow 1 - Horizontal on desktop, vertical on mobile */}
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              mx: { xs: 0, md: 1 },
              my: { xs: 1, md: 0 },
              '& > button': {
                transform: { xs: 'rotate(90deg)', md: 'rotate(0deg)' },
                transition: 'transform 0.3s ease'
              }
            }}>
              <AnimatedArrowButton
                size={56}
                direction="left"
                fill="#4caf50"
                ringBase="#4caf50"
                ringAccent="#66bb6a"
                ariaLabel="Next step"
              />
            </Box>
            
            {/* Step 2 */}
            <Box sx={{ flex: { xs: '1 1 auto', md: '0 1 320px' }, maxWidth: { xs: '100%', md: '320px' }, width: { xs: '100%', md: 'auto' } }}>
              <Card className="blue-border-card" sx={{ height: { md: '400px' }, ...orbVars(202) }}>
                <CardContent className="blue-border-content" sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Box 
                    component="img"
                    src={aiPanelReviewIcon}
                    alt="AI Panel Review"
                    sx={{ 
                      width: 150,
                      height: 150,
                      mb: 2
                    }} 
                  />
                  <Box sx={{
                    px: 2,
                    py: 1,
                    borderRadius: 2,
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    mb: 2,
                    width: '100%',
                    textAlign: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: '-100%',
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
                      animation: 'shimmer 2s infinite',
                    },
                    '@keyframes shimmer': {
                      '0%': { left: '-100%' },
                      '100%': { left: '100%' },
                    },
                  }}>
                    <Typography variant="h6" component="h3" sx={{ fontSize: '0.85rem', fontWeight: 600, lineHeight: 1.2 }}>
                      AI Panel Review
                    </Typography>
                  </Box>
                  <Box sx={{
                    flex: 1,
                    p: 2,
                    borderRadius: 2,
                    backgroundColor: 'rgba(0, 0, 0, 0.25)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                    <Typography sx={{ fontSize: '0.85rem', lineHeight: 1.4, textAlign: 'center' }}>
                      Three agents analyze each answer: rubric coverage, official comparison, and benchmark scoring.
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Box>
            
            {/* Arrow 2 - Horizontal on desktop, vertical on mobile */}
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              mx: { xs: 0, md: 1 },
              my: { xs: 1, md: 0 },
              '& > button': {
                transform: { xs: 'rotate(90deg)', md: 'rotate(0deg)' },
                transition: 'transform 0.3s ease'
              }
            }}>
              <AnimatedArrowButton
                size={56}
                direction="left"
                fill="#2196f3"
                ringBase="#2196f3"
                ringAccent="#42a5f5"
                ariaLabel="Next step"
              />
            </Box>
            
            {/* Step 3 */}
            <Box sx={{ flex: { xs: '1 1 auto', md: '0 1 320px' }, maxWidth: { xs: '100%', md: '320px' }, width: { xs: '100%', md: 'auto' } }}>
              <Card className="green-border-card" sx={{ height: { md: '400px' }, ...orbVars(203) }}>
                <CardContent className="green-border-content" sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Box 
                    component="img"
                    src={confidenceCheckIcon}
                    alt="Confidence Check"
                    sx={{ 
                      width: 150,
                      height: 150,
                      mb: 2
                    }} 
                  />
                  <Box sx={{
                    px: 2,
                    py: 1,
                    borderRadius: 2,
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    mb: 2,
                    width: '100%',
                    textAlign: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: '-100%',
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
                      animation: 'shimmer 2s infinite',
                    },
                    '@keyframes shimmer': {
                      '0%': { left: '-100%' },
                      '100%': { left: '100%' },
                    },
                  }}>
                    <Typography variant="h6" component="h3" sx={{ fontSize: '0.85rem', fontWeight: 600, lineHeight: 1.2 }}>
                      Confidence Check
                    </Typography>
                  </Box>
                  <Box sx={{
                    flex: 1,
                    p: 2,
                    borderRadius: 2,
                    backgroundColor: 'rgba(0, 0, 0, 0.25)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                    <Typography sx={{ fontSize: '0.85rem', lineHeight: 1.4, textAlign: 'center' }}>
                      Combined confidence ≥ 95%? Accept. Below threshold? Auto-flag for teacher review.
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Box>
        </Box>

        {/* Why different */}
        <Box sx={{ py: 8, px: { xs: 0, md: 4 } }}>
          <Typography variant="h4" component="h2" gutterBottom align="center" sx={{ fontWeight: 600, mb: 4 }}>
            Why Our System is Different
          </Typography>
          
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
            <Box 
              component="img"
              src={systemDifferentIcon}
              alt="System Different Illustration"
              sx={{ 
                width: 440,
                height: 'auto',
                maxWidth: '100%'
              }}
            />
          </Box>
          
          <Typography variant="body1" color="text.secondary" maxWidth="md" sx={{ mx: 'auto', textAlign: 'center', mb: 6 }}>
            Our grading stack pairs a three-expert AI ensemble with a 95% confidence bar, full audit trails, and teacher oversight. Routine answers are auto-scored; anything uncertain goes straight to humans—delivering higher accuracy, rock-solid consistency, faster turnaround, and transparent decisions.
          </Typography>
          
          <Grid container spacing={4} sx={{ mt: 4 }}>
            {[
              {
                imageSrc: superiorAccuracyIcon,
                title: 'Superior Accuracy',
                description: 'Triple-check ensemble plus human oversight minimizes errors and catches edge cases.',
                cardClass: 'green-border-card',
                contentClass: 'green-border-content',
              },
              {
                imageSrc: perfectConsistencyIcon,
                title: 'Perfect Consistency',
                description: 'Uniform rubric application across scripts—no fatigue, drift, or random leniency.',
                cardClass: 'blue-border-card',
                contentClass: 'blue-border-content',
              },
              {
                imageSrc: massiveEfficiencyIcon,
                title: 'Massive Efficiency',
                description: 'Triage routine answers at scale so teachers focus on cases needing judgment.',
                cardClass: 'green-border-card',
                contentClass: 'green-border-content',
                flipped: true,
              },
              {
                imageSrc: fullTransparencyIcon,
                title: 'Full Transparency',
                description: 'Every AI decision is logged; uncertain cases escalated. Teachers maintain control.',
                cardClass: 'blue-border-card',
                contentClass: 'blue-border-content',
              },
            ].map((item, i) => {
              return (
              <Grid key={item.title} size={{ xs: 12, sm: 6, md: 3 }}>
                <Card className={item.cardClass} sx={{ height: { md: '400px' }, ...orbVars(301 + i) }}>
                  <CardContent className={item.contentClass} sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Box 
                      component="img"
                      src={item.imageSrc}
                      alt={item.title}
                      sx={{ 
                        width: 150,
                        height: 150,
                        mb: 2,
                        transform: item.flipped ? 'scaleX(-1)' : 'none'
                      }} 
                    />
                    <Box sx={{
                      px: 2,
                      py: 1,
                      borderRadius: 2,
                      backgroundColor: 'rgba(255, 255, 255, 0.08)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      mb: 2,
                      width: '100%',
                      textAlign: 'center',
                      position: 'relative',
                      overflow: 'hidden',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: '-100%',
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
                        animation: 'shimmer 2s infinite',
                      },
                      '@keyframes shimmer': {
                        '0%': { left: '-100%' },
                        '100%': { left: '100%' },
                      },
                    }}>
                      <Typography variant="h6" component="h3" sx={{ fontSize: '0.85rem', fontWeight: 600, lineHeight: 1.2 }}>
                        {item.title}
                      </Typography>
                    </Box>
                    <Box sx={{
                      flex: 1,
                      p: 2,
                      borderRadius: 2,
                      backgroundColor: 'rgba(0, 0, 0, 0.25)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center'
                    }}>
                      <Typography sx={{ fontSize: '0.85rem', lineHeight: 1.4, textAlign: 'center' }}>
                        {item.description}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            )})}
          </Grid>
        </Box>

        {/* Section divider */}
        <Box className="section-divider" />

        {/* Guardrails */}
        <Box sx={{ pt: 4, pb: 4 }}>
          {/* Mobile layout - stacked */}
          <Box sx={{ 
            display: { xs: 'block', md: 'none' },
            textAlign: 'center',
            mb: 6
          }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
              <Box 
                component="img"
                src={guardrailsIcon}
                alt="Guardrails Illustration"
                sx={{ 
                  width: 250,
                  height: 'auto',
                  maxWidth: '100%'
                }}
              />
            </Box>
            
            <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 600, mb: 2, textAlign: 'center' }}>
              Built-In Guardrails
            </Typography>  
            <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 600, mb: 4, textAlign: 'center' }}>
              (Trust by Design)
            </Typography>
            
            <Typography color="text.secondary" sx={{ mb: 3 }}>
              Safety isn't a feature—it's the architecture.
            </Typography>
            <Box sx={{ textAlign: 'left' }}>
              <Typography sx={{ mb: 1.5 }}>
                • <strong>High-confidence only:</strong> AI grades are accepted only at ≥95% confidence; everything else goes to Later Human Review.
              </Typography>
              <Typography sx={{ mb: 1.5 }}>
                • <strong>OCR sanity checks:</strong> Low-confidence handwriting recognition is corrected by humans before any AI grading.
              </Typography>
              <Typography sx={{ mb: 1.5 }}>
                • <strong>Teacher-defined rules:</strong> Rubrics, keys, and examples come from examiners. AI applies—never invents—criteria.
              </Typography>
              <Typography sx={{ mb: 1.5 }}>
                • <strong>Auditability:</strong> Per-question JSON trail (sub-scores + confidence) enables spot checks and appeals.
              </Typography>
              <Typography>
                • <strong>Human in the loop:</strong> Teachers moderate uncertainty, adjudicate edge cases, and audit the system.
              </Typography>
            </Box>
          </Box>

          {/* Desktop layout - 2 columns (icon left, text right) */}
          <Box sx={{ 
            display: { xs: 'none', md: 'flex' },
            alignItems: 'center',
            gap: 4,
            mb: 6
          }}>
            <Box sx={{ 
              flex: '0 0 auto',
              display: 'flex',
              justifyContent: 'center'
            }}>
              <Box 
                component="img"
                src={guardrailsIcon}
                alt="Guardrails Illustration"
                sx={{ 
                  width: 440,
                  height: 'auto',
                  maxWidth: '100%'
                }}
              />
            </Box>

            <Box sx={{ flex: 1 }}>
              <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 600, mb: 4 }}>
                Built-In Guardrails (Trust by Design)
              </Typography>
              
              <Typography color="text.secondary" sx={{ mb: 3 }}>
                Safety isn't a feature—it's the architecture.
              </Typography>
              <Box sx={{ textAlign: 'left' }}>
                <Typography sx={{ mb: 1.5 }}>
                  • <strong>High-confidence only:</strong> AI grades are accepted only at ≥95% confidence; everything else goes to Later Human Review.
                </Typography>
                <Typography sx={{ mb: 1.5 }}>
                  • <strong>OCR sanity checks:</strong> Low-confidence handwriting recognition is corrected by humans before any AI grading.
                </Typography>
                <Typography sx={{ mb: 1.5 }}>
                  • <strong>Teacher-defined rules:</strong> Rubrics, keys, and examples come from examiners. AI applies—never invents—criteria.
                </Typography>
                <Typography sx={{ mb: 1.5 }}>
                  • <strong>Auditability:</strong> Per-question JSON trail (sub-scores + confidence) enables spot checks and appeals.
                </Typography>
                <Typography>
                  • <strong>Human in the loop:</strong> Teachers moderate uncertainty, adjudicate edge cases, and audit the system.
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>


        {/* Skeptics' Q&A */}
        <Box sx={{ pt: 4, pb: 8 }}>
          {/* Mobile layout - stacked */}
          <Box sx={{ 
            display: { xs: 'block', md: 'none' },
            textAlign: 'center',
            mb: 6
          }}>
            <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
              Addressing Concerns — Straight Answers
            </Typography>
            
            <Typography variant="body1" color="text.secondary" maxWidth="md" sx={{ mx: 'auto', mb: 4 }}>
              We hear the concerns. Our approach follows UNESCO/OECD guidance: human-centred AI, teacher oversight, transparency, and clear guardrails—so low-confidence cases go straight to humans and nothing is 'black box.'
            </Typography>
            
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Box 
                component="img"
                src={concernIcon}
                alt="Addressing Concerns Illustration"
                sx={{ 
                  width: 250,
                  height: 'auto',
                  maxWidth: '100%'
                }}
              />
            </Box>
          </Box>

          {/* Desktop layout - 2 columns (text left, icon right) */}
          <Box sx={{ 
            display: { xs: 'none', md: 'flex' },
            alignItems: 'center',
            gap: 4,
            mb: 6
          }}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
                Addressing Concerns — Straight Answers
              </Typography>
              
              <Typography variant="body1" color="text.secondary">
                We hear the concerns. Our approach follows UNESCO/OECD guidance: human-centred AI, teacher oversight, transparency, and clear guardrails—so low-confidence cases go straight to humans and nothing is 'black box.'
              </Typography>
            </Box>
            
            <Box sx={{ 
              flex: '0 0 auto',
              display: 'flex',
              justifyContent: 'center'
            }}>
              <Box 
                component="img"
                src={concernIcon}
                alt="Addressing Concerns Illustration"
                sx={{ 
                  width: 250,
                  height: 'auto',
                  maxWidth: '100%'
                }}
              />
            </Box>
          </Box>
          <Grid container spacing={4} sx={{ mt: 4 }}>
            {[
              {
                title: '"Will AI cost me marks?"',
                body:
                  'No. The AI never guesses; low-confidence answers auto-escalate to teachers. Consistent rubric checks also reduce missed partial credit.',
                color: '#ab47bc',
              },
              {
                title: '"Can AI judge creativity?"',
                body:
                  'For subjective work, we use rubric + example comparison—and keep humans in charge. Novel answers tend to lower AI confidence and route to a teacher.',
                color: '#9c27b0',
              },
              {
                title: '"Are teachers being replaced?"',
                body:
                  'No. Teachers define standards, handle edge cases, and audit outcomes. AI removes drudgery so educators focus on judgement.',
                color: '#8e24aa',
              },
            ].map((q) => (
              <Grid key={q.title} size={{ xs: 12, md: 4 }}>
                <Box 
                  sx={{ 
                    height: '100%',
                    p: { xs: 2, sm: 2.5 },
                    background: `linear-gradient(135deg, ${q.color}18, ${q.color}08)`,
                    border: `1px solid ${q.color}40`,
                    borderRadius: 2,
                    borderLeft: `4px solid ${q.color}`,
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    '&:hover': {
                      borderColor: `${q.color}80`,
                      boxShadow: `0 4px 15px ${q.color}40`,
                    }
                  }}
                >
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontWeight: 700, 
                      color: q.color, 
                      mb: 2,
                      fontSize: { xs: '1rem', sm: '1.1rem' },
                      wordWrap: 'break-word',
                      overflowWrap: 'break-word'
                    }}
                  >
                    {q.title}
                  </Typography>
                  <Typography 
                    sx={{ 
                      lineHeight: 1.6, 
                      color: 'rgba(255, 255, 255, 0.9)', 
                      fontSize: { xs: '0.85rem', sm: '0.95rem' },
                      flex: 1,
                      wordWrap: 'break-word',
                      overflowWrap: 'break-word'
                    }}
                  >
                    {q.body}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Social Proof */}
        <Box sx={{ pt: 0, pb: 6 }}>
          {/* Mobile layout - stacked */}
          <Box sx={{ 
            display: { xs: 'block', md: 'none' },
            textAlign: 'center',
            mb: 6
          }}>
            <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
              What People Are Saying
            </Typography>
            
            <Typography variant="body1" color="text.secondary" maxWidth="md" sx={{ mx: 'auto', mb: 4 }}>
              Dialogue first. Ireland is actively exploring AI for marking; we're committed to listening sessions, transparent evaluations, and rapid iteration with educators at the table.
            </Typography>
            
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Box 
                component="img"
                src={peopleSayingIcon}
                alt="What People Are Saying Illustration"
                sx={{ 
                  width: 250,
                  height: 'auto',
                  maxWidth: '100%'
                }}
              />
            </Box>
          </Box>

          {/* Desktop layout - 2 columns (icon left, text right) */}
          <Box sx={{ 
            display: { xs: 'none', md: 'flex' },
            alignItems: 'center',
            gap: 4,
            mb: 6
          }}>
            <Box sx={{ 
              flex: '0 0 auto',
              display: 'flex',
              justifyContent: 'center'
            }}>
              <Box 
                component="img"
                src={peopleSayingIcon}
                alt="What People Are Saying Illustration"
                sx={{ 
                  width: 250,
                  height: 'auto',
                  maxWidth: '100%'
                }}
              />
            </Box>

            <Box sx={{ flex: 1 }}>
              <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
                What People Are Saying
              </Typography>
              
              <Typography variant="body1" color="text.secondary">
                Dialogue first. Ireland is actively exploring AI for marking; we're committed to listening sessions, transparent evaluations, and rapid iteration with educators at the table.
              </Typography>
            </Box>
          </Box>
          <Grid container spacing={4} sx={{ mt: 4 }}>
            {[
              { quote: '"If this gets results back on time, I\'m all for it."', role: 'Leaving Cert student' },
              { quote: '"Marking hundreds of scripts is brutal—this could be a lifesaver for teachers."', role: 'Secondary school teacher' },
              { quote: '"As long as teachers have final say, speeding up the process makes sense."', role: 'Parent representative' },
            ].map((s, i) => (
              <Grid key={i} size={{ xs: 12, md: 4 }}>
                <Card className="simple-card" sx={{ height: '100%', textAlign: 'center' }}>
                  <CardContent className="simple-content" sx={{ p: 3 }}>
                    <Typography sx={{ fontStyle: 'italic', mb: 1 }}>{s.quote}</Typography>
                    <Typography color="text.secondary">— {s.role}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Section divider */}
        <Box className="section-divider" />

        {/* Makers / Team */}
        <Box sx={{ pt: 4, pb: 8 }}>
          <Typography variant="h4" component="h2" gutterBottom align="center" sx={{ fontWeight: 600 }}>
            Meet the Makers
          </Typography>
          <Typography variant="body1" color="text.secondary" maxWidth="md" sx={{ mx: 'auto', mb: 6, textAlign: 'center' }}>
            The passionate team behind our innovative AI grading system.
          </Typography>
          <Box sx={{ px: { xs: 2, md: 0 }, overflow: 'hidden' }}>
            <MeetTheMakers members={defaultMakers} cardWidth={280} cardHeight={320} speedSec={15} reverse={true} />
          </Box>
        </Box>

        {/* Final CTA */}
        <Box sx={{ 
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
            Help Shape the Future of Education
          </Typography>
          <Typography variant="body1" color="text.secondary" maxWidth="md" sx={{ mx: 'auto', mb: 6 }}>
            We're building this with students, teachers, and parents. Tell us what to keep, fix, or change.
          </Typography>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: 3,
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: 'center'
          }}>
            <LaunchFilledButton 
              onClick={() => window.open(window.location.hostname === 'localhost' ? 'http://localhost:3000' : 'https://irish-lc-demo.netlify.app', '_blank')}
              label="🇮🇪 Try Irish LC Demo"
              gradient={['#e94560', '#f39c12', '#ff6b35']}
            />
            <FillWipeButton 
              onClick={handleOpen}
              label="Share Your Feedback"
              gradient={['#e94560', '#f39c12', '#ff6b35']}
              outlineColor="#f39c12"
            />
          </Box>
        </Box>
      </Container>

      <Modal
        aria-labelledby="feedback-modal-title"
        aria-describedby="feedback-modal-description"
        open={modalOpen}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={modalOpen}>
          <Box sx={{
            ...modalStyle,
            background: 'linear-gradient(135deg, rgba(15, 15, 35, 0.95), rgba(26, 26, 46, 0.9))',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.4)',
            borderRadius: 3,
            p: 0,
          }}>
            <FeedbackForm onClose={handleClose} />
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default HomePage;