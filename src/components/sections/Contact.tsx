import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { theme } from '../../styles/theme';
import { FaEnvelope, FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const ContactSection = styled.section`
  position: relative;
  overflow: hidden;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: ${theme.colors.textLight};
  padding: ${theme.spacing.lg} 0;

  @media (min-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing.xl} 0;
  }

  .container {
    position: relative;
    z-index: 2;
    width: 95%;
    margin: 0 auto;

    @media (min-width: ${theme.breakpoints.sm}) {
      width: 90%;
    }
  }
`;

const SectionTitle = styled(motion.h2)`
  text-align: center;
  font-size: clamp(2rem, 4vw, 2.5rem);
  margin-bottom: ${theme.spacing.lg};
  color: ${theme.colors.light};
  position: relative;

  @media (min-width: ${theme.breakpoints.md}) {
    margin-bottom: ${theme.spacing.xl};
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -${theme.spacing.md};
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 4px;
    background-color: ${theme.colors.accent};
    border-radius: 2px;
  }
`;

const ContactContent = styled.div`
  max-width: 600px;
  margin: ${theme.spacing.lg} auto;
  text-align: center;
  background: ${theme.colors.glass.background};
  backdrop-filter: blur(8px);
  padding: ${theme.spacing.lg};
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(246, 177, 122, 0.15);

  @media (min-width: ${theme.breakpoints.md}) {
    margin: ${theme.spacing.xl} auto;
    padding: ${theme.spacing.xl};
  }
`;

const ContactText = styled(motion.p)`
  font-size: clamp(1rem, 2vw, 1.3rem);
  margin-bottom: ${theme.spacing.lg};
  color: ${theme.colors.textLight};
  line-height: 1.8;
  opacity: 0.9;

  @media (min-width: ${theme.breakpoints.md}) {
    margin-bottom: ${theme.spacing.xl};
  }
`;

const ContactEmail = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  font-size: clamp(0.9rem, 2vw, 1.3rem);
  color: ${theme.colors.accent};
  margin-bottom: ${theme.spacing.lg};
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  border-radius: 30px;
  transition: all ${theme.transitions.default};
  font-weight: 500;
  background: ${theme.colors.glass.card};
  border: 1px solid ${theme.colors.accent};
  word-break: break-all;

  @media (min-width: ${theme.breakpoints.sm}) {
    word-break: normal;
    padding: ${theme.spacing.md} ${theme.spacing.lg};
  }

  svg {
    font-size: 1.2em;
    flex-shrink: 0;

    @media (min-width: ${theme.breakpoints.md}) {
      font-size: 1.4em;
    }
  }

  &:hover {
    background: ${theme.colors.gradient.accent};
    color: ${theme.colors.textDark};
    transform: translateY(-3px);
    box-shadow: 0 6px 16px ${theme.colors.overlay.dark};
  }
`;

const SocialLinks = styled(motion.div)`
  display: flex;
  justify-content: center;
  gap: ${theme.spacing.md};
  margin-top: ${theme.spacing.lg};

  @media (min-width: ${theme.breakpoints.md}) {
    gap: ${theme.spacing.lg};
    margin-top: ${theme.spacing.xl};
  }
`;

const SocialLink = styled(motion.a)`
  color: ${theme.colors.accent};
  font-size: 1.6rem;
  transition: all ${theme.transitions.default};
  width: 45px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: ${theme.colors.glass.card};
  box-shadow: 0 4px 12px rgba(246, 177, 122, 0.1);

  @media (min-width: ${theme.breakpoints.md}) {
    width: 60px;
    height: 60px;
    font-size: 2rem;
  }

  &:hover {
    color: ${theme.colors.light};
    transform: translateY(-3px) rotate(8deg);
    box-shadow: 0 6px 16px rgba(246, 177, 122, 0.2);
    background: ${theme.colors.gradient.glass};
  }
`;

const Contact = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <ContactSection id="contact" role="region" aria-label="Contact Information">
      <div className="container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <SectionTitle 
            variants={itemVariants}
            role="heading"
            aria-level={2}
          >
            Get In Touch
          </SectionTitle>
          <ContactContent role="article">
            <ContactText 
              variants={itemVariants}
              role="paragraph"
            >
              I'm always interested in hearing about new projects and opportunities.
              Whether you have a question or just want to say hi, feel free to reach out!
            </ContactText>
            <ContactEmail 
              href="mailto:your.email@example.com"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Send me an email at your.email@example.com"
            >
              <FaEnvelope aria-hidden="true" />
              <span>your.email@example.com</span>
            </ContactEmail>
            <SocialLinks 
              variants={itemVariants}
              role="list"
              aria-label="Social media links"
            >
              <SocialLink 
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5 }}
                role="listitem"
                aria-label="Visit my GitHub profile"
              >
                <FaGithub aria-hidden="true" />
                <span className="sr-only">GitHub</span>
              </SocialLink>
              <SocialLink 
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5 }}
                role="listitem"
                aria-label="Connect with me on LinkedIn"
              >
                <FaLinkedin aria-hidden="true" />
                <span className="sr-only">LinkedIn</span>
              </SocialLink>
              <SocialLink 
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5 }}
                role="listitem"
                aria-label="Follow me on Twitter"
              >
                <FaTwitter aria-hidden="true" />
                <span className="sr-only">Twitter</span>
              </SocialLink>
            </SocialLinks>
          </ContactContent>
        </motion.div>
      </div>
    </ContactSection>
  );
};

export default Contact;
