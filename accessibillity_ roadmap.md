# Website Accessibility Roadmap
## Face Art Obwalden (faceartow.ch)

---

## Executive Summary

This document outlines the accessibility improvements needed to make the Face Art Obwalden website compliant with WCAG 2.1 Level AA standards and ensure all users, including those with disabilities, can access and use the website effectively.

**Target Compliance Level:** WCAG 2.1 Level AA  
**Estimated Timeline:** 2-4 weeks  
**Priority:** High (legal compliance + better user experience)

---

## Goals & Benefits

### Primary Goals
1. **Legal Compliance**: Meet WCAG 2.1 Level AA standards and Swiss accessibility requirements
2. **Inclusive Design**: Ensure all users can book services regardless of ability
3. **SEO Improvement**: Better semantic HTML improves search engine rankings
4. **User Experience**: Create a better experience for all users, not just those with disabilities

### Expected Benefits
- Reach 15-20% more potential customers (people with disabilities and their families)
- Improved search engine rankings
- Better mobile experience
- Future-proofed website as accessibility becomes mandatory
- Professional reputation enhancement

---

## Current Accessibility Issues

### Severity Levels
- 🔴 **Critical**: Blocks access for users with disabilities (must fix first)
- 🟡 **High**: Significantly impairs experience (fix soon)
- 🟢 **Medium**: Minor issues (fix when possible)

---

## Issues by Page

### All Pages (Site-wide)

#### 🔴 CRITICAL ISSUES

**1. Missing Language Declaration**
- **Problem**: No `lang` attribute on HTML element
- **Impact**: Screen readers can't determine correct pronunciation
- **WCAG**: 3.1.1 Language of Page (Level A)

**2. Missing Skip Navigation Link**
- **Problem**: Keyboard users must tab through entire navigation every page
- **Impact**: Frustrating for keyboard-only users
- **WCAG**: 2.4.1 Bypass Blocks (Level A)

**3. Social Media Links Missing**
- **Problem**: "Follow Me" section has no actual links
- **Impact**: Users cannot follow on social media, broken promises
- **WCAG**: N/A (functional issue)

#### 🟡 HIGH PRIORITY

**4. Navigation Accessibility**
- **Problem**: Navigation items may not have proper ARIA labels
- **Impact**: Screen reader users may not understand navigation structure
- **WCAG**: 4.1.2 Name, Role, Value (Level A)

**5. Focus Indicators**
- **Problem**: Need to verify all interactive elements have visible focus states
- **Impact**: Keyboard users can't see where they are on the page
- **WCAG**: 2.4.7 Focus Visible (Level AA)

**6. Color Contrast**
- **Problem**: Need to verify all text meets 4.5:1 contrast ratio
- **Impact**: Low vision users and people with color blindness struggle to read content
- **WCAG**: 1.4.3 Contrast (Minimum) (Level AA)

---

### Homepage (/)

#### 🔴 CRITICAL ISSUES

**7. Portfolio Images - Generic Alt Text**
- **Problem**: All 30+ images have identical alt text: "Face painting artwork"
- **Impact**: Screen reader users hear "Face painting artwork" 30 times with no way to distinguish images
- **WCAG**: 1.1.1 Non-text Content (Level A)
- **Current Alt Text**: "Face painting artwork"
- **Example Fix**: "Child with blue and purple butterfly face paint", "Spider-Man face painting on young boy", "Rainbow unicorn design with silver glitter"

**8. Contact Form Missing Labels**
- **Problem**: Form inputs only have placeholder text, no proper `<label>` elements
- **Impact**: Screen readers can't identify fields; labels disappear when typing
- **WCAG**: 3.3.2 Labels or Instructions (Level A), 1.3.1 Info and Relationships (Level A)
- **Fields Affected**: Name, E-mail, Telefon, Nachricht

**9. Form Required Fields Not Marked**
- **Problem**: No indication which fields are required
- **Impact**: Users don't know what to fill in, leading to errors
- **WCAG**: 3.3.2 Labels or Instructions (Level A)

**10. Country Code Selector Not Accessible**
- **Problem**: "CH" country code needs proper labeling
- **Impact**: Screen reader users don't know what "CH" means
- **WCAG**: 4.1.2 Name, Role, Value (Level A)

#### 🟡 HIGH PRIORITY

**11. Image Gallery/Carousel Controls**
- **Problem**: "Previous slide" / "Next slide" controls need keyboard accessibility
- **Impact**: Keyboard users cannot navigate gallery
- **WCAG**: 2.1.1 Keyboard (Level A)

**12. Gallery Current Position Indicator**
- **Problem**: No announcement of "Image 5 of 30" for screen readers
- **Impact**: Users don't know their position in gallery
- **WCAG**: 1.3.1 Info and Relationships (Level A)

**13. CTA Button Context**
- **Problem**: "Bueche jetzt" (Book now) and "Mini Arbet" (My work) buttons may need more context
- **Impact**: Screen reader users may not understand button purpose out of context
- **WCAG**: 2.4.4 Link Purpose (In Context) (Level A)

#### 🟢 MEDIUM PRIORITY

**14. Form Error Handling**
- **Problem**: Need to verify error messages are accessible
- **Impact**: Users can't fix form errors
- **WCAG**: 3.3.1 Error Identification (Level A), 3.3.3 Error Suggestion (Level AA)

**15. Heading Hierarchy**
- **Problem**: Verify proper heading structure (single h1, logical order)
- **Impact**: Screen reader navigation is confusing
- **WCAG**: 1.3.1 Info and Relationships (Level A)

---

### About Page (/über)

#### 🔴 CRITICAL ISSUES

**16. Content Structure**
- **Problem**: Need to verify semantic HTML usage (not all divs)
- **Impact**: Screen readers can't navigate by landmarks
- **WCAG**: 1.3.1 Info and Relationships (Level A)

**17. List Structure for Services**
- **Problem**: "Was Ich Abiet" section should use proper list markup
- **Impact**: Screen readers can't announce "List of 6 items"
- **WCAG**: 1.3.1 Info and Relationships (Level A)
- **Affected Items**:
  - Geburtstagsfiir und Fäscht
  - Schuelverastaltigen und Festival
  - Firmefamiliefii
  - Gmeinschaftsverastaltigen und Märt
  - Privati Fiir und Zämmekunft
  - Massgeschnidereti Designs und Theme

#### 🟡 HIGH PRIORITY

**18. Heading Hierarchy**
- **Problem**: Verify "Was Ich Abiet" and "Mini Verpflichtig" use proper heading levels
- **Impact**: Navigation and document structure unclear
- **WCAG**: 1.3.1 Info and Relationships (Level A)

---

### FAQ Page (/faq)

#### 🔴 CRITICAL ISSUES

**19. FAQ Structure - Not Using Proper Markup**
- **Problem**: FAQs should use disclosure widgets (`<details>` and `<summary>`) or ARIA accordion pattern
- **Impact**: Screen readers can't navigate efficiently; keyboard users can't collapse/expand
- **WCAG**: 4.1.2 Name, Role, Value (Level A)
- **Current**: Likely all questions visible at once
- **Fix**: Implement collapsible accordion with proper ARIA or HTML5 `<details>`

**20. FAQ Keyboard Navigation**
- **Problem**: If FAQ items are expandable, need proper keyboard controls
- **Impact**: Keyboard users can't interact with FAQ
- **WCAG**: 2.1.1 Keyboard (Level A)

#### 🟡 HIGH PRIORITY

**21. "Kontaktiered Sie mich" Link Context**
- **Problem**: Link needs more context or should open in same window
- **Impact**: Users may be disoriented if link behavior is unexpected
- **WCAG**: 2.4.4 Link Purpose (In Context) (Level A)

**22. Answer Formatting**
- **Problem**: Long answers may need better structure (lists, paragraphs)
- **Impact**: Difficult to read and navigate
- **WCAG**: 1.3.1 Info and Relationships (Level A)

---

## Implementation Roadmap

### Phase 1: Critical Fixes (Week 1)
**Goal**: Remove barriers that completely block access

**Tasks:**

1. **Add Language Declaration** ⏱️ 5 min
   - Add `lang="de-CH"` or `lang="gsw"` to `<html>` tag
   ```html
   <html lang="de-CH">
   ```

2. **Fix All Image Alt Text** ⏱️ 2-3 hours
   - Create unique, descriptive alt text for each of 30+ portfolio images
   - Use format: "[Design/character] face paint on [child/person], [notable colors/details]"
   - Examples:
     * "Blue and purple butterfly face paint with sparkles"
     * "Spider-Man mask design in red and black"
     * "Rainbow unicorn with pink horn and silver glitter accents"
   - Save alt text in spreadsheet or data file for reference

3. **Add Proper Form Labels** ⏱️ 30 min
   ```html
   <!-- Before -->
   <input type="text" placeholder="Name" />
   
   <!-- After -->
   <label for="name">Name *</label>
   <input type="text" id="name" name="name" required aria-required="true" />
   ```
   - Add labels for: Name, E-mail, Telefon, Nachricht
   - Keep placeholders as examples, not labels
   - Mark required fields with `*` and `required` attribute
   - Add visible "* = Required field" text

4. **Fix Country Code Selector** ⏱️ 15 min
   ```html
   <label for="country-code">Country Code</label>
   <select id="country-code" name="country-code">
     <option value="+41">CH (+41)</option>
   </select>
   ```

5. **Implement FAQ Accordion** ⏱️ 1-2 hours
   - Use HTML5 `<details>` and `<summary>` OR
   - Implement ARIA accordion pattern
   - Ensure keyboard navigation (Enter/Space to toggle, Arrow keys to move)
   
   **Option A - Simple HTML5:**
   ```html
   <details>
     <summary>Weli Art vo Farbe verwändisch?</summary>
     <p>Ich verwänd usschliesslich hochwärtigi...</p>
   </details>
   ```
   
   **Option B - ARIA (for more control):**
   ```html
   <div class="faq-item">
     <button aria-expanded="false" aria-controls="faq-1">
       Weli Art vo Farbe verwändisch?
     </button>
     <div id="faq-1" hidden>
       <p>Ich verwänd usschliesslich hochwärtigi...</p>
     </div>
   </div>
   ```

6. **Fix Services List Structure** ⏱️ 15 min
   ```html
   <h2>Was Ich Abiet</h2>
   <ul>
     <li>Geburtstagsfiir und Fäscht</li>
     <li>Schuelverastaltigen und Festival</li>
     <!-- etc -->
   </ul>
   ```

**Testing After Phase 1:**
- Screen reader test (NVDA/JAWS on Windows, VoiceOver on Mac)
- Keyboard-only navigation test
- Form submission test with screen reader

---

### Phase 2: High Priority (Week 2)
**Goal**: Improve navigation and usability

**Tasks:**

7. **Add Skip Navigation Link** ⏱️ 30 min
   ```html
   <a href="#main-content" class="skip-link">Skip to main content</a>
   
   <style>
   .skip-link {
     position: absolute;
     top: -40px;
     left: 0;
     background: #000;
     color: #fff;
     padding: 8px;
     z-index: 100;
   }
   .skip-link:focus {
     top: 0;
   }
   </style>
   ```

8. **Improve Navigation ARIA** ⏱️ 30 min
   ```html
   <nav aria-label="Main navigation">
     <ul>
       <li><a href="/" aria-current="page">Startsiite</a></li>
       <li><a href="/über">Über mich</a></li>
       <li><a href="/faq">FAQ</a></li>
     </ul>
   </nav>
   ```

9. **Add Focus Indicators** ⏱️ 1 hour
   ```css
   /* Ensure all interactive elements have visible focus */
   a:focus, button:focus, input:focus, textarea:focus, select:focus {
     outline: 3px solid #0066cc;
     outline-offset: 2px;
   }
   
   /* Never use outline: none without replacing it */
   ```

10. **Improve Gallery Controls** ⏱️ 1-2 hours
    ```html
    <div role="region" aria-label="Portfolio gallery" aria-live="polite">
      <button aria-label="Previous image">
        <span aria-hidden="true">←</span>
      </button>
      
      <div aria-live="polite" aria-atomic="true">
        Image <span class="current-slide">1</span> of <span class="total-slides">30</span>
      </div>
      
      <button aria-label="Next image">
        <span aria-hidden="true">→</span>
      </button>
    </div>
    ```
    - Add keyboard support: Arrow keys to navigate, Escape to close
    - Add current position announcement

11. **Check Color Contrast** ⏱️ 1 hour
    - Use tool: https://webaim.org/resources/contrastchecker/
    - Check all text against backgrounds
    - Minimum ratios:
      * Normal text: 4.5:1
      * Large text (18pt+): 3:1
      * UI components: 3:1
    - Fix any failing combinations

12. **Improve Button Context** ⏱️ 30 min
    ```html
    <!-- Before -->
    <a href="#contact">Bueche jetzt</a>
    
    <!-- After -->
    <a href="#contact" aria-label="Book face painting services now">
      Bueche jetzt
    </a>
    
    <!-- Or add visually-hidden text -->
    <a href="#contact">
      Bueche jetzt <span class="sr-only">for face painting services</span>
    </a>
    ```

**Testing After Phase 2:**
- Full keyboard navigation test
- Color contrast audit
- Screen reader navigation test

---

### Phase 3: Polish & Testing (Week 3)
**Goal**: Fine-tune and ensure quality

**Tasks:**

13. **Form Error Handling** ⏱️ 1-2 hours
    ```html
    <div class="form-group">
      <label for="email">E-mail *</label>
      <input 
        type="email" 
        id="email" 
        name="email"
        required
        aria-required="true"
        aria-invalid="false"
        aria-describedby="email-error"
      />
      <span id="email-error" class="error" role="alert" hidden>
        Please enter a valid email address
      </span>
    </div>
    ```
    - Show errors with `role="alert"` for screen reader announcement
    - Link errors to fields with `aria-describedby`
    - Set `aria-invalid="true"` on error
    - Focus first error field on submit

14. **Verify Heading Hierarchy** ⏱️ 30 min
    - Ensure single `<h1>` per page
    - Logical order: h1 → h2 → h3 (no skipping)
    - Use headingMap browser extension to check
    
    **Homepage:**
    ```
    h1: Face Art Obwaldä
    h2: Mini Arbet
    h2: Kontakt
    h3: Kontaktinformatione
    ```

15. **Add Semantic Landmarks** ⏱️ 30 min
    ```html
    <header>
      <nav aria-label="Main navigation">...</nav>
    </header>
    
    <main id="main-content">
      <!-- page content -->
    </main>
    
    <footer>
      <!-- footer content -->
    </footer>
    ```

16. **Add Social Media Links** ⏱️ 15 min
    ```html
    <div class="social-links">
      <h3>Follow Me</h3>
      <a href="https://instagram.com/yourhandle" 
         aria-label="Follow us on Instagram">
        <svg aria-hidden="true">...</svg>
      </a>
      <!-- Add actual links when available -->
    </div>
    ```

17. **Create Accessibility Statement** ⏱️ 1 hour
    - Create page: `/accessibility`
    - Document conformance level
    - Provide contact for accessibility issues
    - List known issues and timeline
    - Link from footer

**Testing After Phase 3:**
- Full WCAG 2.1 AA audit using tools:
  * WAVE browser extension
  * axe DevTools
  * Lighthouse accessibility audit
- Manual testing with screen reader
- Manual keyboard navigation
- Mobile accessibility testing

---

### Phase 4: Documentation & Maintenance (Week 4)
**Goal**: Ensure long-term accessibility

**Tasks:**

18. **Create Developer Guidelines** ⏱️ 2 hours
    - Document accessible patterns used
    - Create component library examples
    - Add to project README

19. **Accessibility Testing Checklist** ⏱️ 1 hour
    - Create pre-deployment checklist
    - Add to CI/CD if applicable

20. **User Testing** ⏱️ 2-4 hours
    - Test with real users who use assistive technology
    - Ask for feedback
    - Iterate based on findings

21. **Automated Testing Setup** ⏱️ 2 hours
    - Add axe-core to testing pipeline
    - Set up pa11y or similar for automated checks
    - Create baseline reports

---

## Testing Strategy

### Tools Required

**Free Tools:**
- **NVDA** (Windows screen reader) - https://www.nvaccess.org/
- **VoiceOver** (Mac/iOS screen reader) - Built into macOS/iOS
- **WAVE Extension** - https://wave.webaim.org/extension/
- **axe DevTools** - Browser extension
- **Lighthouse** - Built into Chrome DevTools
- **Color Contrast Analyzer** - https://www.tpgi.com/color-contrast-checker/
- **headingsMap** - Browser extension

### Testing Checklist

**Keyboard Navigation:**
- [ ] Tab through entire page - all interactive elements reachable?
- [ ] Focus indicators visible on all interactive elements?
- [ ] Skip link appears and works on Tab?
- [ ] Gallery/carousel navigable with arrow keys?
- [ ] Forms fillable with keyboard only?
- [ ] FAQ accordion works with Enter/Space?

**Screen Reader (NVDA/VoiceOver):**
- [ ] Page title announced correctly?
- [ ] Headings navigable with H key?
- [ ] Landmarks navigable (R key in NVDA)?
- [ ] Images have unique, descriptive alt text?
- [ ] Forms announce labels and required status?
- [ ] Form errors announced?
- [ ] Buttons have clear labels?
- [ ] Links have clear purpose?

**Visual:**
- [ ] Text readable at 200% zoom?
- [ ] No loss of information at 400% zoom?
- [ ] Color contrast meets 4.5:1 minimum?
- [ ] Content understandable without color?

**Code Validation:**
- [ ] HTML validates (https://validator.w3.org/)?
- [ ] No ARIA errors?
- [ ] No duplicate IDs?
- [ ] Proper lang attribute?

---

## Code Examples & Resources

### Essential ARIA Patterns

**Accordion (for FAQ):**
```html
<div class="accordion">
  <div class="accordion-item">
    <h3>
      <button 
        id="accordion-button-1"
        aria-expanded="false" 
        aria-controls="accordion-panel-1"
      >
        Weli Art vo Farbe verwändisch?
      </button>
    </h3>
    <div 
      id="accordion-panel-1" 
      role="region"
      aria-labelledby="accordion-button-1"
      hidden
    >
      <p>Ich verwänd usschliesslich hochwärtigi...</p>
    </div>
  </div>
</div>

<script>
// Toggle accordion
button.addEventListener('click', () => {
  const expanded = button.getAttribute('aria-expanded') === 'true';
  button.setAttribute('aria-expanded', !expanded);
  panel.hidden = expanded;
});
</script>
```

**Image Gallery with Live Announcement:**
```html
<div class="gallery" role="region" aria-label="Face painting portfolio">
  <button 
    aria-label="Previous image"
    onclick="previousSlide()"
  >
    Previous
  </button>
  
  <div aria-live="polite" aria-atomic="true" class="sr-only">
    Image <span id="current">1</span> of <span id="total">30</span>
  </div>
  
  <img 
    src="image1.jpg" 
    alt="Blue butterfly face paint with purple accents and silver glitter"
  />
  
  <button 
    aria-label="Next image"
    onclick="nextSlide()"
  >
    Next
  </button>
</div>
```

**Accessible Form:**
```html
<form onsubmit="handleSubmit(event)">
  <div class="form-group">
    <label for="name">
      Name <span aria-label="required">*</span>
    </label>
    <input 
      type="text"
      id="name"
      name="name"
      required
      aria-required="true"
      aria-invalid="false"
      aria-describedby="name-error"
    />
    <span id="name-error" role="alert" class="error" hidden>
      Name is required
    </span>
  </div>
  
  <div class="form-group">
    <label for="email">
      E-mail <span aria-label="required">*</span>
    </label>
    <input 
      type="email"
      id="email"
      name="email"
      required
      aria-required="true"
      aria-describedby="email-error"
    />
    <span id="email-error" role="alert" class="error" hidden>
      Please enter a valid email address
    </span>
  </div>
  
  <button type="submit">Sende</button>
</form>

<style>
.error {
  color: #d00;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

.sr-only {
  position: absolute;
  left: -10000px;
  width: 1px;
  height: 1px;
  overflow: hidden;
}
</style>
```

---

## Resources

### WCAG Guidelines
- **WCAG 2.1 Overview**: https://www.w3.org/WAI/WCAG21/quickref/
- **Swiss Accessibility Law**: https://www.edi.admin.ch/edi/en/home/fachstellen/ebgb/themes-de-l-egalite/e-accessibility.html

### Testing Tools
- **WAVE**: https://wave.webaim.org/
- **axe DevTools**: https://www.deque.com/axe/devtools/
- **NVDA Screen Reader**: https://www.nvaccess.org/
- **Colour Contrast Analyser**: https://www.tpgi.com/color-contrast-checker/

### Learning Resources
- **WebAIM**: https://webaim.org/
- **A11y Project**: https://www.a11yproject.com/
- **MDN Accessibility**: https://developer.mozilla.org/en-US/docs/Web/Accessibility
- **ARIA Authoring Practices**: https://www.w3.org/WAI/ARIA/apg/

### Component Patterns
- **ARIA Accordion**: https://www.w3.org/WAI/ARIA/apg/patterns/accordion/
- **ARIA Carousel**: https://www.w3.org/WAI/ARIA/apg/patterns/carousel/
- **Forms**: https://www.w3.org/WAI/tutorials/forms/

---

## Success Metrics

### How to Measure Success

**Automated Testing:**
- [ ] Lighthouse accessibility score: 95+ (currently likely 60-75)
- [ ] WAVE errors: 0 (currently likely 15-20)
- [ ] axe DevTools violations: 0 critical, 0 serious

**Manual Testing:**
- [ ] Complete keyboard navigation without mouse
- [ ] Complete screen reader navigation
- [ ] Form submission with screen reader
- [ ] Gallery navigation with keyboard

**Business Metrics:**
- [ ] Reduced bounce rate (easier to use = people stay longer)
- [ ] Increased form submissions (accessible forms = more conversions)
- [ ] Better SEO rankings (semantic HTML helps Google)

---

## Quick Reference Cheat Sheet

### Most Common Issues & Fixes

| Issue | Quick Fix | Time |
|-------|-----------|------|
| Missing alt text | Add descriptive alt to each image | 5 min/image |
| Form without labels | Add `<label for="id">` + `id` on input | 5 min/field |
| No lang attribute | Add `lang="de-CH"` to `<html>` | 1 min |
| Poor contrast | Use contrast checker, adjust colors | 10 min |
| Missing focus | Add `:focus { outline: 3px solid }` | 15 min |
| No skip link | Add positioned link to `#main` | 15 min |
| List not marked up | Wrap in `<ul>` or `<ol>` | 5 min |
| No heading hierarchy | Use proper h1-h6, don't skip levels | 15 min |

### Testing Shortcuts

**Windows:**
- NVDA: `Ctrl + Alt + N` to start
- Navigate headings: `H`
- Navigate links: `Tab`
- Navigate landmarks: `D`

**Mac:**
- VoiceOver: `Cmd + F5` to start
- Navigate: `Ctrl + Option + Arrow keys`
- Rotor menu: `Ctrl + Option + U`

---

## Next Steps

1. **Review this document** and prioritize tasks based on your timeline
2. **Set up testing tools** (NVDA/VoiceOver, WAVE extension)
3. **Start with Phase 1** - Critical fixes that remove access barriers
4. **Test after each phase** to verify improvements
5. **Document changes** as you make them for future reference

Questions or need clarification on any task? Feel free to ask!

---

**Document Version:** 1.0  
**Last Updated:** February 2026  
**Author:** Accessibility Audit for Face Art Obwalden