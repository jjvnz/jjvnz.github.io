/* ── Alpine.js component controllers ── */

function app() {
  return {
    menuOpen: false,
    currentSection: '',
    currentLang: localStorage.getItem('lang') || 'es',
    t(key) {
      const lang = this.currentLang === 'en' ? i18n.en : i18n.es;
      return lang[key] || key;
    },
    toggleLang() {
      var self = this;
      var apply = function () {
        self.currentLang = self.currentLang === 'es' ? 'en' : 'es';
        localStorage.setItem('lang', self.currentLang);
      };
      if (document.startViewTransition) {
        document.startViewTransition(apply);
      } else {
        apply();
      }
    },
    toggleBodyScroll(value) {
      document.body.style.overflow = value ? 'hidden' : '';
    },
    init() {
      var self = this;
      var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            self.currentSection = entry.target.id;
          }
        });
      }, { threshold: 0.25, rootMargin: '-80px 0px 0px 0px' });
      document.querySelectorAll('section[id]').forEach(function(s) {
        observer.observe(s);
      });
      self.$watch('menuOpen', function(val) {
        document.body.style.overflow = val ? 'hidden' : '';
      });
    }
  };
}

function contactForm() {
  return {
    form: { name: '', email: '', message: '' },
    errors: { name: '', email: '', message: '' },
    sending: false,
    success: false,
    validate(field) {
      if (field === 'name') {
        this.errors.name = this.form.name.trim().length < 2 ? 'El nombre debe tener al menos 2 caracteres' : '';
      }
      if (field === 'email') {
        this.errors.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.form.email) ? '' : 'Ingresa un email válido';
      }
      if (field === 'message') {
        this.errors.message = this.form.message.trim().length < 10 ? 'El mensaje debe tener al menos 10 caracteres' : '';
      }
    },
    submitForm() {
      if (this.form.email) {
        this.validate('email');
        if (this.errors.email) return;
      }
      this.sending = true;
      setTimeout(() => {
        this.sending = false;
        this.success = true;
        this.form = { name: '', email: '', message: '' };
      }, 800);
    }
  };
}
